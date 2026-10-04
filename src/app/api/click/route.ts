import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { dbName, getMongoClient } from "@/lib/mongodb";

const validIds = new Set(profile.links.map((link) => link.id));

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
