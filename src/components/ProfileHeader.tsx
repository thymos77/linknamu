type Props = {
  name: string;
  bio: string;
  imageUrl?: string;
};

export default function ProfileHeader({ name, bio, imageUrl }: Props) {
  return (
    <section className="flex flex-col items-center text-center">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={`${name} 프로필 사진`}
          className="h-28 w-28 rounded-full object-cover shadow-[0_8px_30px_-8px_rgba(180,110,70,0.35)] ring-4 ring-white/70 dark:ring-white/10 sm:h-32 sm:w-32"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-[#f6c7a1] to-[#e3906a] text-4xl font-semibold text-white shadow-[0_8px_30px_-8px_rgba(180,110,70,0.45)] ring-4 ring-white/70 dark:from-[#b8755a] dark:to-[#7e4634] dark:ring-white/10 sm:h-32 sm:w-32"
        >
          {name.slice(0, 1)}
        </div>
      )}
      <h1 className="mt-6 text-2xl font-bold tracking-tight text-stone-900 dark:text-stone-50">{name}</h1>
      <p className="mt-2 max-w-[19rem] text-[15px] leading-relaxed text-stone-600 dark:text-stone-400">{bio}</p>
    </section>
  );
}
