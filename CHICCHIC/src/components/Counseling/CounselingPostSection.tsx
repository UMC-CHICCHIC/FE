import { useNavigate } from "react-router-dom";
import { usePostFilter } from "../../store/usePostFilter";
import type { PostCategory } from "../../types/enums/category";
import SkeletonPostCard from "../skeletons/SkeletonPostCard";
import { useGetConsultPost } from "../../hooks/queries/useGetConsultPost";
import { useCounselingStore } from "../../store/useConsultPost";
import { DateTimeFormat } from "../../utils/dateTimeFormat";

type PostSectionProps = {
  category: PostCategory;
};

// List에서 게시글 미리보기
const PostSection = ({ category }: PostSectionProps) => {
  const { setCategory } = usePostFilter();
  const { setConsultPostId } = useCounselingStore();
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetConsultPost(category);

  if (error) return <div className="p-6">상품 정보를 불러오지 못했어요.</div>;

  return (
    <section className="mb-20 text-[#66191F]">
      <ul className="space-y-4">
        {/* 게시글 스켈레톤 UI */}
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonPostCard key={i} />
            ))
          : data?.result.content.map((post) => (
              <li
                key={post.consultPostId}
                onClick={() => {
                  setCategory(category);
                  setConsultPostId(post.consultPostId);
                  navigate(
                    `/community/recommendation/list/${post.consultPostId}`
                  );
                }}
                className="flex justify-between items-end border-b border-[#AB3130] py-4 hover:bg-[#f5f1ee] transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="postImage"
                      className="object-cover rounded-xl w-30 h-26 sm:w-[224px] sm:h-[177px]"
                    />
                  ) : (
                    <div className="w-[224px] bg-gray-200 h-[177px] rounded-xl"></div>
                  )}
                  <div className="flex flex-col gap-8 sm:gap-10">
                    <button
                      onClick={() => {
                        setCategory(category);
                        setConsultPostId(post.consultPostId);
                        navigate(
                          `/community/recommendation/list/${post.consultPostId}`
                        );
                      }}
                      className="text-[#AB3130] text-start font-semibold text-lg sm:text-3xl mb-2 hover:underline cursor-pointer"
                    >
                      {post.title}
                    </button>
                    <div className="flex items-center space-x-4">
                      <img
                        src="/profile.png"
                        alt="프로필"
                        className="object-cover w-6 h-6 rounded-full sm:w-12 sm:h-12"
                      />
                      <span className="sm:text-2xl">{post.nickname}</span>
                    </div>
                  </div>
                </div>
                <span className="text-[8px] sm:text-xl mb-3 sm:mb-4">
                  {DateTimeFormat(post.dateTime)}
                </span>
              </li>
            ))}
      </ul>
    </section>
  );
};

export default PostSection;
