const SkeletonPostCard = () => {
  return (
    <li className="flex justify-between items-center border-b border-[#AB3130] py-4 ">
      <div className="flex items-center gap-4 animate-pulse">
        <div className="h-24 bg-gray-300 w-30 rounded-xl"></div>
        <div className="flex flex-col gap-4">
          <div className="w-48 h-6 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
            <div className="w-20 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
      <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
    </li>
  );
};

export default SkeletonPostCard;
