export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  imageUrl?: string;
  links: LinkItem[];
};

export const profile: Profile = {
  name: "김클로",
  bio: "세계 최강 바이브코더",
  // public/ 폴더에 사진을 넣고 경로를 지정하세요. 예: "/profile.jpg"
  imageUrl: undefined,
  // TODO: 실제 주소로 교체
  links: [
    { id: "github", title: "GitHub", url: "https://github.com" },
    { id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com" },
    { id: "blog", title: "Blog", url: "https://example.com" },
  ],
};
