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
  name: "김민석",
  bio: "삼성전자 MES팀 | 요즈음에는 리더십, AI 개발에 관심이 많아요.",
  // public/ 폴더에 사진을 넣고 경로를 지정하세요. 예: "/profile.jpg"
  imageUrl: undefined,
  links: [
    { id: "github", title: "깃허브", url: "https://github.com/thymos77" },
    { id: "blog", title: "블로그", url: "https://github.com/thymos77" },
    { id: "email", title: "이메일", url: "mailto:thymos77@gmail.com" },
  ],
};
