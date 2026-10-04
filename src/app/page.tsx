import LinkCard from "@/components/LinkCard";
import ProfileHeader from "@/components/ProfileHeader";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col items-center px-4 pb-16 pt-14 sm:pt-20">
      <div className="fixed right-4 top-4">
        <ThemeToggle />
      </div>

      {/* 상단: 원형 프로필 사진, 이름, 한 줄 소개 */}
      <ProfileHeader name={profile.name} bio={profile.bio} imageUrl={profile.imageUrl} />

      {/* 하단: 링크 카드 세로 목록 */}
      <nav aria-label="링크 목록" className="mt-10 w-full">
        <ul className="flex flex-col gap-4">
          {profile.links.map((link) => (
            <li key={link.id}>
              <LinkCard id={link.id} title={link.title} url={link.url} />
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
