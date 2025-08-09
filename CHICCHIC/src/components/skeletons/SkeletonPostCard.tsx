const SkeletonPostCard = () => {
  return (
    <li className="flex justify-between items-end border-b border-[#AB3130] py-4 ">
      <div className="flex items-center gap-10 animate-pulse">
        <div className="w-30 h-26 sm:w-[224px] sm:h-[177px] bg-gray-300 rounded-xl"></div>
        <div className="flex flex-col gap-8 sm:gap-14">
          <div className="w-48 h-6 bg-gray-300 rounded"></div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            <div className="w-5 h-2 bg-gray-300 rounded sm:w-20 sm:h-4"></div>
          </div>
        </div>
      </div>
      <div className="h-6 mb-2 bg-gray-300 rounded w-26 animate-pulse"></div>
    </li>
  );
};

export default SkeletonPostCard;
