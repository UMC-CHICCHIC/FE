import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../../apis/axiosInstance";

interface DiaryPost {
  diaryId: number;
  title: string;
  nickname: string;
  createdAt: string;
  imageUrl: string | null;
}

interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: DiaryPost[];
}

const PerfumePage = () => {
  const navigate = useNavigate();
  const [publicPosts, setPublicPosts] = useState<DiaryPost[]>([]);
  const [myPosts, setMyPosts] = useState<DiaryPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [myLoading, setMyLoading] = useState(true);

  // 공개 게시글 API 데이터 가져오기 (최신 3개만)
  const fetchPublicDiaries = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/diary/public");

      if (response.data.isSuccess) {
        // 최신 3개만 가져오기
        setPublicPosts(response.data.result.slice(0, 3));
      }
    } catch (err) {
      console.error("공개 게시글 API 에러:", err);
    } finally {
      setLoading(false);
    }
  };

  // 나의 일기 API 데이터 가져오기 (최신 3개만)
  const fetchMyDiaries = async () => {
    try {
      setMyLoading(true);
      const response = await axiosInstance.get<ApiResponse>("/diary/my");

      if (response.data.isSuccess) {
        // 최신 3개만 가져오기
        setMyPosts(response.data.result.slice(0, 3));
      }
    } catch (err) {
      console.error("나의 일기 API 에러:", err);
    } finally {
      setMyLoading(false);
    }
  };

  useEffect(() => {
    fetchPublicDiaries();
    fetchMyDiaries();
  }, []); // 컴포넌트 마운트 시에만 데이터 로드

  const handlePublicDiaryClick = () => {
    navigate("/community/diary/public-diary");
  };

  const handleMyDiaryClick = () => {
    navigate("/community/diary/my-diary");
  };

  const handleNewDiaryButton = () => {
    navigate("/community/diary/new");
  };

  const handlePostClick = (diaryId: number) => {
    navigate(`/community/diary/public-diary/${diaryId}`);
  };

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
          <button
            onClick={handleNewDiaryButton}
            className="bg-[#AB3130] cursor-pointer text-[#FFFFFF] px-[1.5rem] py-[0.75rem] text-[20px] border-none rounded-full"
          >
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
              <button
                onClick={handlePublicDiaryClick}
                className="text-[1.5rem] text-[#AB3130] bg-transparent border-none cursor-pointer hover:underline"
              >
                더보기 &gt;
              </button>
            </div>
            <ul>
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="text-[#AB3130] text-lg">로딩 중...</div>
                </div>
              ) : publicPosts.length === 0 ? (
                <div className="flex justify-center items-center py-10">
                  <div className="text-gray-500 text-lg">
                    공개 게시글이 없습니다.
                  </div>
                </div>
              ) : (
                publicPosts.map((post) => (
                  <li
                    key={`public-${post.diaryId}`}
                    className="ml-[-2rem] flex justify-between items-center py-6 border-b border-[#AB3130] cursor-pointer hover:bg-[#f5f1ee] transition-colors"
                    onClick={() => handlePostClick(post.diaryId)}
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
                          <img
                            src="/profile.png"
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                          <div className="ml-[0.5rem]">{post.nickname}</div>
                        </div>
                      </div>
                    </div>
                    {/* 오른쪽: 날짜 */}
                    <span className="text-sm text-gray-600">
                      {post.createdAt}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </section>

          {/* 2-2. 나의 향수 일기장 */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[2.5rem] font-bold text-[#AB3130]">
                나의 향수 일기장
              </h2>
              <button
                onClick={handleMyDiaryClick}
                className="text-[1.5rem] text-[#AB3130] bg-transparent border-none cursor-pointer hover:underline"
              >
                더보기 &gt;
              </button>
            </div>
            <ul>
              {myLoading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="text-[#AB3130] text-lg">로딩 중...</div>
                </div>
              ) : myPosts.length === 0 ? (
                <div className="flex justify-center items-center py-10">
                  <div className="text-gray-500 text-lg">
                    나의 일기가 없습니다.
                  </div>
                </div>
              ) : (
                myPosts.map((post) => (
                  <li
                    key={`diary-${post.diaryId}`}
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
                          <img
                            src="/profile.png"
                            alt="Profile"
                            className="w-[2rem] h-[2rem] object-cover rounded-[999px]"
                          />
                          <div className="ml-[0.5rem]">{post.nickname}</div>
                        </div>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600">
                      {post.createdAt}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PerfumePage;
