import { useNavigate } from "react-router-dom";
import { usePostFilter } from "../../store/usePostFilter";
import type { PostCategory, PostPrev } from "../../types/post";

type CouselingCategoryProps = {
  posts: PostPrev[];
  category: PostCategory;
};

// List에서 게시글 미리보기
const PostSection = ({ posts, category }: CouselingCategoryProps) => {
  const { setCategory } = usePostFilter();
  const navigate = useNavigate();

  return (
    <section className="mb-4 text-[#66191F]">
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.postId}
            className="flex justify-between items-center border-b border-[#AB3130] py-4"
          >
            <div className="flex items-center gap-4">
              {post.image ? (
                <img
                  src={post.image}
                  alt="post image"
                  className="object-cover h-24 w-30 rounded-xl"
                />
              ) : (
                <div className="h-24 bg-gray-300 w-30 rounded-xl"></div>
              )}
              <div className="flex flex-col gap-4">
                <button
                  onClick={() => {
                    setCategory(
                      category === "RECOMMEND" ? "RECOMMEND" : "RECOMMENDED"
                    );
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
                  <span className="ml-2">{post.writer}</span>
                </div>
              </div>
            </div>
            <span className="text-sm">{post.createdAt}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PostSection;
