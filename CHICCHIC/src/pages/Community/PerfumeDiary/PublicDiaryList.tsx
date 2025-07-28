import { useState } from "react";
import { useNavigate } from "react-router-dom";

const PublicDiaryList = () => {
  interface Post {
    imageUrl?: string;
    profileImage?: string;
    title: string;
    author: string;
    date: string;
  }

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const publicPosts: Post[] = [
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 1",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.11.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 2",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.12.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 3",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.13.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 4",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.14.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 5",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.15.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 6",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.16.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 7",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.17.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "공개 게시글 제목 8",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.18.",
    },
  ];

  // 페이지네이션 계산
  const totalPages = Math.ceil(publicPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = publicPosts.slice(startIndex, endIndex);

  // 페이지 변경 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // 페이지 번호 배열 생성
  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const navigate = useNavigate();

  return (
    <div>
      <div className="bg-[#F9F5F2] min-h-screen">
        <main className="w-[95%] max-w-4xl mx-auto p-8 bg-[#F9F5F2]">
          {/* 공개 게시글 섹션 */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-[2.5rem] font-bold text-[#AB3130]">
                공개 게시글
              </h2>
            </div>

            {/* 게시글 목록 */}
            <div className="space-y-0">
              {currentPosts.map((post, index) => (
                <div
                  key={`public-${startIndex + index}`}
                  className="flex justify-between items-center py-6 border-b border-[#AB3130]"
                >
                  <div className="flex items-center">
                    {/* 이미지 */}
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-[10rem] h-[8rem] object-cover rounded-[20px] flex-shrink-0"
                      />
                    ) : (
                      <div className="w-[10rem] h-[8rem] bg-[#F0F0F0] rounded-[20px] flex-shrink-0"></div>
                    )}

                    {/* 텍스트 정보 */}
                    <div className="ml-6 flex-1">
                      <h3 className="font-semibold text-[#AB3130] text-[1.5rem] mb-3">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-700">
                        {post.profileImage ? (
                          <img
                            src={post.profileImage}
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-full flex-shrink-0"
                          />
                        ) : (
                          <img
                            src="/profile.png"
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-full flex-shrink-0"
                          />
                        )}
                        <span className="ml-2">{post.author}</span>
                      </div>
                    </div>
                  </div>

                  {/* 날짜 */}
                  <span className="text-sm text-gray-600 flex-shrink-0">
                    {post.date}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* 글쓰기 버튼 */}
          <div className="flex justify-end mt-[-1rem]">
            <button
              onClick={() => navigate("/community/diary/new")}
              className="bg-[#AB3130] text-white px-10 py-2 rounded-full cursor-pointer"
            >
              글쓰기
            </button>
          </div>

          {/* 페이지네이션 */}
          <div className="flex justify-center items-center space-x-2 mt-12">
            {/* 이전 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-2  ${
                currentPage === 1
                  ? "text-[#AB3130] cursor-not-allowed"
                  : " text-[#AB3130]  hover:bg-[#AB3130] hover:text-white"
              } transition-colors duration-200`}
            >
              <span className="text-[1.5rem]">&lt;</span>
            </button>

            {/* 페이지 번호 */}
            {getPageNumbers().map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => handlePageChange(pageNum)}
                className={`px-4 py-2 transition-colors duration-200 ${
                  currentPage === pageNum
                    ? "bg-[#AB3130] text-white"
                    : " text-[#AB3130]  hover:bg-[#AB3130] hover:text-white"
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* 다음 버튼 */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-2  ${
                currentPage === totalPages
                  ? "text-[#AB3130] cursor-not-allowed"
                  : "text-[#AB3130]  hover:bg-[#AB3130] hover:text-white"
              } transition-colors duration-200`}
            >
              <span className="text-[1.5rem]">&gt;</span>
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PublicDiaryList;
