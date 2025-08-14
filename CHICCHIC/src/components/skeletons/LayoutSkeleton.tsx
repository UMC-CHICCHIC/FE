import { memo } from "react";

interface LayoutSkeletonProps {
  variant?: 'full' | 'content' | 'card';
}

const LayoutSkeleton = memo(({ variant = 'full' }: LayoutSkeletonProps) => {
  if (variant === 'card') {
    return (
      <div className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
        <div className="w-full h-40 bg-gray-200 rounded mb-4"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (variant === 'content') {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="w-48 h-8 bg-gray-200 rounded animate-pulse mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <LayoutSkeleton key={index} variant="card" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F7F4EF] min-h-screen flex flex-col">
      {/* Navbar 스켈레톤 */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-4">
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <main className="flex-1">
        <LayoutSkeleton variant="content" />
      </main>

      {/* Footer 스켈레톤 */}
      <div className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="space-y-3">
                <div className="w-24 h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-32 h-4 bg-gray-600 rounded animate-pulse"></div>
                <div className="w-28 h-4 bg-gray-600 rounded animate-pulse"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});

LayoutSkeleton.displayName = "LayoutSkeleton";

export default LayoutSkeleton;