import { useNavigate } from "react-router-dom";
import { usePostFilter } from "../../store/usePostFilter";
import type { PostCategory } from "../../types/enums/postCategory";
import SkeletonPostCard from "../skeletons/SkeletonPostCard";
import { useGetConsultPost } from "../../hooks/queries/useGetConsultPost";
import { useCounselingStore } from "../../store/useConsultPost";

type PostSectionProps = {
  category: PostCategory;
};

// List에서 게시글 미리보기
const PostSection = ({ category }: PostSectionProps) => {
  const { setCategory } = usePostFilter();
  const { setConsultPostId } = useCounselingStore();
  const navigate = useNavigate();
  const { data, isLoading } = useGetConsultPost(category);

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
                className="flex justify-between items-center border-b border-[#AB3130] py-4"
              >
                <div className="flex items-center gap-4">
                  {post.imageUrl ? (
                    <img
                      src={post.imageUrl}
                      alt="postImage"
                      className="object-cover h-24 w-30 rounded-xl"
                    />
                  ) : (
                    <div className="h-24 bg-gray-300 w-30 rounded-xl"></div>
                  )}
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => {
                        setCategory(category);
                        setConsultPostId(post.consultPostId);
                        navigate(
                          `/community/recommendation/list/${post.consultPostId}`
                        );
                      }}
                      className="text-[#AB3130] font-semibold text-lg mb-2 hover:underline cursor-pointer"
                    >
                      {post.title}
                    </button>
                    <div className="flex items-center text-sm">
                      <img
                        src={"/profile.png"}
                        alt="프로필"
                        className="object-cover w-6 h-6 rounded-full"
                      />
                      <span className="ml-2">{post.nickname}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm">{post.dateTime}</span>
              </li>
            ))}
      </ul>
    </section>
  );
};

export default PostSection;
