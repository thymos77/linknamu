import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { dbName, getMongoClient } from "@/lib/mongodb";

// 클릭 수는 매 요청마다 최신 값을 읽어야 하므로 빌드 시 정적으로 굳히지 않는다
export const dynamic = "force-dynamic";

const validIds = new Set(profile.links.map((link) => link.id));

// 모든 링크의 클릭 수를 한 번에 돌려준다. 기록이 없는 링크는 0회.
export async function GET() {
  const counts: Record<string, number> = Object.fromEntries(profile.links.map((link) => [link.id, 0]));

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    return NextResponse.json({ counts });
  }

  try {
    const client = await clientPromise;
    const docs = await client
      .db(dbName)
      .collection<{ linkId: string; count: number }>("clicks")
      .find({ linkId: { $in: Array.from(validIds) } }, { projection: { _id: 0, linkId: 1, count: 1 } })
      .toArray();
    for (const doc of docs) counts[doc.linkId] = doc.count;
    return NextResponse.json({ counts }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("클릭 수 조회 실패:", error);
    return NextResponse.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  if (typeof linkId !== "string" || !validIds.has(linkId)) {
    return NextResponse.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }

  const clientPromise = getMongoClient();
  if (!clientPromise) {
    // DB 설정 전에도 페이지는 정상 동작하도록 기록만 건너뛴다
    return NextResponse.json({ ok: true, recorded: false });
  }

  try {
    const client = await clientPromise;
    await client
      .db(dbName)
      .collection("clicks")
      .updateOne(
        { linkId },
        { $inc: { count: 1 }, $set: { updatedAt: new Date() } },
        { upsert: true },
      );
    return NextResponse.json({ ok: true, recorded: true });
  } catch (error) {
    console.error("클릭 수 저장 실패:", error);
    return NextResponse.json({ error: "클릭 수를 저장하지 못했습니다." }, { status: 500 });
  }
}
