export function PrivacySkeleton() {
  return (
    <>
      <div className="relative w-32 h-32 mb-20">
        <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full" />
      </div>
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-x-16 gap-y-6">
          {[...Array(4)].map((_, idx) => (
            <div key={idx}>
              <div className="w-24 h-5 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="w-full h-12 bg-gray-100 animate-pulse rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
