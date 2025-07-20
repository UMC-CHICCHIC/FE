interface Post {
  imageUrl?: string;
  profileImage?: string;
  title: string;
  author: string;
  date: string;
}

const PerfumePage = () => {
  // 샘플 데이터
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
  ];

  const myDiaryPosts: Post[] = [
    {
      imageUrl: "/sample-image.png",
      title: "일기 제목 1",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.19.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "일기 제목 2",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.20.",
    },
    {
      imageUrl: "/sample-image.png",
      title: "일기 제목 3",
      author: "닉네임",
      profileImage: "/profile.png",
      date: "2025.07.21.",
    },
  ];

  return (
    <div>
      {/* 1. 상단 배너 섹션 */}
      <div className="h-[80vh] bg-[url('/perfume-diary-home.png')] bg-cover bg-center flex items-end justify-start">
        <div className="mb-[8rem] text-left ml-[8rem]">
          <h2 className="text-[32px] mb-[2rem] text-[#FFFFFF]">
            나만의 향기가 담긴 기억부터,
            <br />
            다른 이들의 향기로 완성된 이야기까지 함께 들여다볼 수 있어요.
          </h2>
          <button className="bg-[#AB3130] text-[#FFFFFF] px-[1.5rem] py-[0.75rem] text-[20px] border-none rounded-full">
            새 일기 작성하기
          </button>
        </div>
      </div>

      {/* 2. 메인 콘텐츠 섹션 */}
      <div className="bg-[#F9F5F2]">
        <main className="w-[95%] max-w-4xl mx-auto p-8 bg-[#F9F5F2]">
          {/* 2-1. 공개 게시글 */}
          <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[2.5rem] font-bold text-[#AB3130]">
                공개 게시글
              </h2>
              <a href="#" className="text-[1.5rem] text-[#AB3130] no-underline">
                더보기 &gt;
              </a>
            </div>
            <ul>
              {publicPosts.map((post, index) => (
                <li
                  key={`public-${index}`}
                  className="ml-[-2rem] flex justify-between items-center py-6 border-b border-[#AB3130]"
                >
                  <div className="flex items-center my-[1.5rem]">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-[10rem] h-[8rem] object-cover rounded-[20px]"
                      />
                    ) : (
                      <div className="w-[10rem] h-[8rem] bg-[#F0F0F0] object-cover border-none rounded-[20px]"></div>
                    )}
                    <div>
                      <h3 className="font-semibold text-[#AB3130] text-[1.5rem] mb-2 ml-[0.5rem]">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm ml-[0.5rem] text-gray-700">
                        {post.profileImage ? (
                          <img
                            src={post.profileImage}
                            alt={post.title}
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                        ) : (
                          <img
                            src="url('/profile.png')"
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                        )}
                        <div className="ml-[0.5rem]">{post.author}</div>
                      </div>
                    </div>
                  </div>
                  {/* 오른쪽: 날짜 */}
                  <span className="text-sm text-gray-600">{post.date}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* 2-2. 나의 향수 일기장 */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[2.5rem] font-bold text-[#AB3130]">
                나의 향수 일기장
              </h2>
              <a href="#" className="text-[1.5rem] text-[#AB3130] no-underline">
                더보기 &gt;
              </a>
            </div>
            <ul>
              {myDiaryPosts.map((post, index) => (
                <li
                  key={`diary-${index}`}
                  className="ml-[-2rem] flex justify-between items-center py-6 border-b border-[#AB3130]"
                >
                  <div className="flex items-center my-[1.5rem]">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-[10rem] h-[8rem] object-cover rounded-[20px]"
                      />
                    ) : (
                      <div className="w-[10rem] h-[8rem] bg-[#F0F0F0] object-cover border-none rounded-[20px]"></div>
                    )}
                    <div>
                      <h3 className="font-semibold text-[#AB3130] text-[1.5rem] mb-2 ml-[0.5rem]">
                        {post.title}
                      </h3>
                      <div className="flex items-center text-sm ml-[0.5rem] text-gray-700">
                        {post.profileImage ? (
                          <img
                            src={post.profileImage}
                            alt={post.title}
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                        ) : (
                          <img
                            src="/profile.png"
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                        )}
                        <div className="ml-[0.5rem]">{post.author}</div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">{post.date}</span>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PerfumePage;
