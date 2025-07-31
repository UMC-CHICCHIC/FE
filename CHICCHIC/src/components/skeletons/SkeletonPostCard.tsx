const SkeletonPostCard = () => {
  return (
    <div className="flex flex-col gap-2 animate-pulse">
      <div className="w-full h-40 bg-[#e6dad3] rounded-xl" />
      <div className="w-3/4 h-4 bg-[#e6dad3] rounded" />
      <div className="w-1/2 h-3 bg-[#e6dad3] rounded" />
    </div>
  );
};

export default SkeletonPostCard;
