export const CardSkeleton = () => {
  return (
    <div className="animate-pulse bg-white dark:bg-zinc-800 rounded-xl shadow p-4 w-full h-40 flex flex-col gap-3">
      <div className="h-5 bg-gray-300 dark:bg-neutral-700 rounded w-2/3" />
      <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-full" />
      <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-5/6" />
      <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-3/4 mt-auto" />
    </div>
  );
};
