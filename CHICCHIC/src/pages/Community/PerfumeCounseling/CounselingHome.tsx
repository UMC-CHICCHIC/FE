import counselingMainImage from "/counselingHome.svg";
import RightArrow from "../../../assets/icons/arrowRight.svg";

interface Post {
  imageUrl?: string;
  profileImage?: string;
  title: string;
  author: string;
  date: string;
}

const dummyPosts: Post[] = [
  {
    imageUrl: "/sample-image.png",
    title: "제목제목제목제목",
    author: "닉네임",
    profileImage: "/profile.png",
    date: "2025.07.01.",
  },
  {
    title: "제목제목제목제목",
    author: "닉네임",
    date: "2025.07.01.",
  },
];

const PerfumeCounselingHome = () => {
  return (
    <div className="bg-[#F9F5F2]">
      {/* 상단 배너 */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src={counselingMainImage}
          alt="background"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />
        <div className="pb-25 ml-20 font-[pretendard] relative z-10 flex flex-col items-start justify-end h-full px-4 text-white sm:px-8 md:px-20">
          <h1 className="mb-4 whitespace-pre-line leading-24 text-[clamp(2.25rem,4.75vw,3.75rem)] font-medium">
            향수 추천 상담소
          </h1>
          <p className="font-extralight text-[clamp(1.25rem,1.75vw,1.5rem)]">
            어떤 향수를 사야할지 고민된다면, 향수 추천 상담소에서 추천
            받아보세요!
          </p>
        </div>
      </section>

      {/* 콘텐츠 섹션 */}
      <main className="w-[95%] max-w-5xl mx-auto py-16">
        {/* 추천 받아요 */}
        <PostSection title="추천 받아요! 최근 게시글" posts={dummyPosts} />

        {/* 추천해요 */}
        <PostSection title="추천해요! 최근 게시글" posts={dummyPosts} />
      </main>
    </div>
  );
};

export default PerfumeCounselingHome;

// 게시글 섹션 컴포넌트
const PostSection = ({ title, posts }: { title: string; posts: Post[] }) => {
  return (
    <section className="mb-14">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-[1.8rem] font-semibold text-[#AB3130]">{title}</h2>
        <a
          href="#"
          className="flex items-center justify-center gap-3 text-[#AB3130] text-sm sm:text-base"
        >
          더보기
          <img src={RightArrow} width={6} alt="" />
        </a>
      </div>
      <ul className="space-y-4">
        {posts.map((post, index) => (
          <li
            key={index}
            className="flex justify-between items-center border-b border-[#AB3130] pt-4"
          >
            <div className="flex items-center gap-4">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt="post image"
                  className="object-cover w-24 h-24 rounded-xl"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-300 rounded-xl"></div>
              )}
              <div>
                <h3 className="text-[#AB3130] font-semibold text-lg mb-2">
                  {post.title}
                </h3>
                <div className="flex items-center text-sm text-gray-700">
                  <img
                    src={post.profileImage || "/profile.png"}
                    alt="프로필"
                    className="object-cover w-6 h-6 rounded-full"
                  />
                  <span className="ml-2">{post.author}</span>
                </div>
              </div>
            </div>
            <span className="text-sm text-gray-500">{post.date}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
