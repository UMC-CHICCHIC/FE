import { useNavigate } from "react-router-dom";
import { usePostFilter } from "../../store/usePostFilter";
import type { Post } from "../../types/post";
import type { PostCategory } from "../../types/enums/postCategory";
import SkeletonPostCard from "../skeletons/SkeletonPostCard";

type CouselingCategoryProps = {
  posts: Post[];
  category: PostCategory;
  isLoading: boolean;
  isError: boolean;
};

// List에서 게시글 미리보기
const PostSection = ({
  posts,
  category,
  isLoading,
  isError,
}: CouselingCategoryProps) => {
  const { setCategory } = usePostFilter();
  const navigate = useNavigate();

  return (
    <section className="mb-20 text-[#66191F]">
      <ul className="space-y-4">
        {/* 게시글 스켈레톤 UI */}
        {isLoading || isError
          ? Array.from({ length: 3 }).map((_, i) => (
              <SkeletonPostCard key={i} />
            ))
          : posts.map((post) => (
              <li
                key={post.consultId}
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
                        setCategory(category === "GIVE" ? "GIVE" : "RECEIVE");
                        navigate("/community/recommendation/list/detail");
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
