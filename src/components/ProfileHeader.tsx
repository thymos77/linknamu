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
          className="h-32 w-32 rounded-full object-cover ring-4 ring-white shadow-md dark:ring-gray-800 sm:h-36 sm:w-36"
        />
      ) : (
        <div
          aria-hidden
          className="flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-green-600 text-4xl font-bold text-white ring-4 ring-white shadow-md dark:ring-gray-800 sm:h-36 sm:w-36"
        >
          {name.slice(0, 1)}
        </div>
      )}
      <h1 className="mt-5 text-2xl font-bold">{name}</h1>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 sm:text-base">{bio}</p>
    </section>
  );
}
