import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { PerfumeGrid } from "../components/PersonalPerfumeTest/perfume-grid";
import mainlogo2 from "../assets/images/main-logo.png";
import mainpage from "../assets/images/mainpage.png";
import { perfumeStoryMock } from "../mocks/perfumeStroyMock";

export default function Home() {
  const { isLoggedIn, loading: authLoading } = useAuth();
  const isAuthenticated = isLoggedIn;

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, []);

  const storyDetails: Record<string, { summary: string; teaser: string }> = {
    "ancient-egypt": {
      summary:
        "향유와 수지로 만든 초기 향수는 신에게 바치는 공물과 일상 의식에서 사용됐어요.",
      teaser:
        "이집트의 제조법은 그리스·로마로 전해져 오늘날 향수 문화의 시작점이 되었습니다.",
    },
    "perfume-vs-eau": {
      summary:
        "퍼퓸, 오드퍼퓸, EDT는 향료 농도와 지속력이 달라요. 표기만 보고도 차이를 이해할 수 있어요.",
      teaser:
        "상황과 취향에 맞게 농도를 고르는 법을 간단한 기준으로 정리했습니다.",
    },
    "perfume-longevity": {
      summary:
        "오래가는 향이 항상 좋은 건 아닙니다. 계절·피부타입·공간에 따라 적절한 지속력이 달라집니다.",
      teaser: "나에게 맞는 잔향 길이를 선택하는 체크포인트를 알아보세요.",
    },
  };

  const storySubtitles: Record<string, string> = {
    "ancient-egypt": "향수의 기원과 의식에서의 쓰임",
    "perfume-vs-eau": "부향률 차이와 선택 가이드",
    "perfume-longevity": "나에게 맞는 지속력 고르는 법",
  };

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading || authLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
            <div className="container relative z-30 px-4 mx-auto sm:px-6 lg:px-8">
              <div className="flex md:translate-x-8 md:-translate-y-10">
                <div className="w-full py-16 text-center md:w-1/2 md:text-left">
                  <div className="w-48 h-48 mx-auto mb-4 rounded-lg md:w-60 md:h-60 bg-gray-300/20 md:mx-0 md:-ml-20 animate-pulse"></div>
                  <div className="mb-6 space-y-4">
                    <div className="w-3/4 h-8 mx-auto rounded-md bg-gray-300/20 md:mx-0 animate-pulse"></div>
                    <div className="w-2/3 h-8 mx-auto rounded-md bg-gray-300/20 md:mx-0 animate-pulse"></div>
                    <div className="w-1/2 h-8 mx-auto rounded-md bg-gray-300/20 md:mx-0 animate-pulse"></div>
                  </div>
                  <div className="w-full h-20 mb-6 rounded-md bg-gray-300/20 animate-pulse"></div>
                  <div className="mb-8 space-y-2">
                    <div className="w-full h-6 rounded-md bg-gray-300/20 animate-pulse"></div>
                    <div className="w-4/5 h-6 rounded-md bg-gray-300/20 animate-pulse"></div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                    <div className="w-48 h-12 rounded-md bg-gray-300/20 animate-pulse"></div>
                    <div className="w-48 h-12 rounded-md bg-gray-300/20 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 z-40 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-16 h-16 mx-auto mb-4 border-b-2 border-white rounded-full animate-spin"></div>
                <p className="text-xl">페이지를 불러오는 중입니다...</p>
              </div>
            </div>
          </section>
          <section className="py-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="w-64 h-10 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded-md w-80 animate-pulse"></div>
                </div>
                <div className="w-32 h-6 bg-gray-300 rounded-md animate-pulse"></div>
              </div>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-300 animate-pulse rounded-lg" />
                    <div className="space-y-2 text-left">
                      <div className="w-3/4 h-6 mb-1 bg-gray-300 rounded animate-pulse" />
                      <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse" />
                      <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <section className="py-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="mb-8">
                <div className="h-10 mb-2 bg-gray-300 rounded-md w-72 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-md w-96 animate-pulse"></div>
              </div>
              <div className="max-w-4xl p-10 mx-auto bg-white border-2 border-gray-300 rounded-lg">
                <div className="space-y-6 text-center">
                  <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-3/4 h-8 mx-auto bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="w-full h-6 bg-gray-300 rounded-md animate-pulse"></div>
                    <div className="w-5/6 h-6 mx-auto bg-gray-300 rounded-md animate-pulse"></div>
                  </div>
                  <div className="w-64 h-12 mx-auto bg-gray-300 rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="pt-8 pb-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between pt-12 mb-8 border-t border-gray-300">
                <div>
                  <div className="w-64 h-10 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
                  <div className="w-48 h-6 bg-gray-300 rounded-md animate-pulse"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-md w-80 animate-pulse"></div>
              </div>

              <div className="space-y-16">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-8 md:flex-row md:gap-12"
                  >
                    <div className="w-full md:w-1/2">
                      <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="w-full space-y-4 md:w-1/2">
                      <div className="w-4/5 h-8 bg-gray-300 rounded-md animate-pulse"></div>
                      <div className="w-full h-5 bg-gray-300 rounded-md animate-pulse"></div>
                      <div className="w-5/6 h-5 bg-gray-300 rounded-md animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
          <img
            src={mainpage}
            alt="CHICCHIC perfume bottle"
            className="absolute top-0 right-0 z-10 hidden object-cover object-left w-full h-full md:block"
          />

          <div className="container relative z-30 px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex md:translate-x-8 md:-translate-y-10">
              <div className="w-full py-16 text-center md:w-1/2 md:text-left">
                <img
                  src={mainlogo2}
                  alt="CHICCHIC Brand Logo"
                  className="w-30 h-30 md:w-60 md:h-60 object-contain mx-auto md:mx-0 md:-ml-20 mb-[-20px]"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(29%) sepia(72%) saturate(1347%) hue-rotate(330deg) brightness(91%) contrast(94%)",
                  }}
                />
                <div className="space-y-2 ">
                  <h2 className="text-2xl md:text-3xl font-light text-[#AB3130]">
                    How to reveal yourself
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-light text-[#AB3130]">
                    more CHIC,
                  </h2>
                  <p className="text-2xl md:text-3xl font-light text-[#AB3130] pt-4">
                    start with
                  </p>
                </div>

                <h1 className="mt-2 text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
                  CHICCHIC.
                </h1>

                <p className="text-xl md:text-lg text-[#AB3130] mt-6 leading-relaxed">
                  나를 더 CHIC하게 드러내는 법,
                  <br />
                  CHICCHIC에서 시작하세요.
                </p>

                <div className="flex flex-col items-center justify-center gap-4 pt-8 sm:flex-row md:justify-start">
                  {!isAuthenticated ? (
                    // 비로그인 상태 버튼
                    <>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#66191F] transition-colors w-full sm:w-auto"
                      >
                        <span>로그인/회원가입</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/personal-perfume/test"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#66191F] transition-colors w-full sm:w-auto"
                      >
                        <span>퍼스널 향수 테스트</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </>
                  ) : (
                    // 로그인 상태 버튼
                    <>
                      <Link
                        to="/mypage"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#66191F] transition-colors w-full sm:w-auto"
                      >
                        <span>마이페이지</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/personal-perfume/test"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#66191F] transition-colors w-full sm:w-auto"
                      >
                        <span>퍼스널 향수 테스트</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Popular Products Section --- */}
        <section id="collection" className="py-16 bg-[#F8F5F2]">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Popular Products
                </h2>
                <p className="text-muted-foreground">
                  현재 가장 인기 있는 향수들을 둘러보세요.
                </p>
              </div>
              <Link
                to="/PopularPerfumeId"
                className="text-[#AB3130] font-semibold flex items-center gap-1"
              >
                <span>인기 향수 더보기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <PerfumeGrid />
          </div>
        </section>

        {/* --- Personal Perfume List Section --- */}
        {isAuthenticated ? (
          <section id="personal-perfume-list" className="py-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="mb-8">
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Personal perfume List
                </h2>
                <p className="text-muted-foreground">
                  퍼스널 향수 추천 테스트 결과에 따라 추천된 향수입니다.
                </p>
              </div>
              <PerfumeGrid />
            </div>
          </section>
        ) : (
          <section
            id="first-login-notice"
            className="py-12 md:py-20 bg-[#F8F5F2]"
          >
            <div className="container px-4 mx-auto">
              <div className="mb-8">
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Personal perfume List
                </h2>
                <p className="text-muted-foreground">
                  퍼스널 향수 추천 테스트 결과에 따라 추천된 향수입니다.
                </p>
              </div>
            </div>
            <div className="container px-4 mx-auto text-center">
              <div className="max-w-lg md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto bg-white border-2 border-[#AB3130] rounded-lg p-6 md:p-10 lg:p-12">
                <div className="mb-6 md:mb-8">
                  <div className="flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <svg
                      className="w-20 h-16 md:w-22 md:h-22 lg:w-28 lg:h-28 text-[#AB3130]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>

                  <h3 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#AB3130] mb-100 md:mb-10 px-2 max-w-5xl mx-auto">
                    퍼스널 향수 추천 테스트를 아직 진행하지 않았어요.
                  </h3>
                  <p className="max-w-4xl px-2 mx-auto mb-6 text-base leading-relaxed text-gray-600 md:text-lg lg:text-xl xl:text-2xl md:mb-8">
                    퍼스널 향수 추천 테스트를 진행 후, 나에게 어울리는 향수를
                    추천 받아보세요!
                    <br />
                    <span className="block mt-1">
                      (로그아웃 상태일 경우 로그인 후 진행으로 이동됩니다.)
                    </span>
                  </p>
                  <Link
                    to="/login"
                    className="bg-[#AB3130] text-white px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-4 xl:px-12 xl:py-5 rounded-full hover:bg-[#8B2829] transition-colors font-semibold inline-block text-base md:text-lg lg:text-xl xl:text-2xl"
                  >
                    퍼스널 향수 추천 테스트 진행하기
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Perfume Story Section --- */}
        <section id="perfume-story" className="pt-8 pb-16 bg-[#F8F5F2]">
          <div className="container px-4 mx-auto">
            <div className="flex items-center justify-between pt-12 mb-8 border-t border-gray-300">
              <div>
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Perfume Story
                </h2>
                <p className="text-muted-foreground">
                  향수에 대해 궁금증이 생긴다면?
                </p>
              </div>
              <Link
                to="/community/story"
                className="text-[#AB3130] font-semibold flex items-center gap-1 text-xl"
              >
                <span>향수 이야기에서 더 다양한 소식 확인하기</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-16">
              {/* Story Item 1 */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src={perfumeStoryMock.posts[0].imageUrl}
                    data-ai-hint="ancient egypt perfume"
                    alt={perfumeStoryMock.posts[0].imageAlt}
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg"
                  />
                </div>
                <div className="w-full text-left md:w-1/2">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    {perfumeStoryMock.posts[0].title}{" "}
                    {perfumeStoryMock.posts[0].description}
                  </h3>
                  <p className="text-lg font-semibold text-[#AB3130] mb-2">
                    {storySubtitles[perfumeStoryMock.posts[0].id]}
                  </p>
                  <p className="mb-2 text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[0].id]?.summary}
                  </p>
                  <p className="text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[0].id]?.teaser}
                  </p>
                </div>
              </div>
              {/* Story Item 2 */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src={perfumeStoryMock.posts[1].imageUrl}
                    data-ai-hint="ancient egypt perfume"
                    alt={perfumeStoryMock.posts[1].imageAlt}
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg"
                  />
                </div>
                <div className="w-full text-left md:w-1/2">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    {perfumeStoryMock.posts[1].title}{" "}
                    {perfumeStoryMock.posts[1].description}
                  </h3>
                  <p className="text-lg font-semibold text-[#AB3130] mb-2">
                    {storySubtitles[perfumeStoryMock.posts[1].id]}
                  </p>
                  <p className="mb-2 text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[1].id]?.summary}
                  </p>
                  <p className="text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[1].id]?.teaser}
                  </p>
                </div>
              </div>
              {/* Story Item 3 */}
              <div className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src={perfumeStoryMock.posts[2].imageUrl}
                    data-ai-hint="perfume bottle art"
                    alt={perfumeStoryMock.posts[2].imageAlt}
                    width={600}
                    height={400}
                    className="object-cover w-full bg-gray-300 rounded-lg"
                  />
                </div>
                <div className="w-full text-left md:w-1/2">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    {perfumeStoryMock.posts[2].title}{" "}
                    {perfumeStoryMock.posts[2].description}
                  </h3>
                  <p className="text-lg font-semibold text-[#AB3130] mb-2">
                    {storySubtitles[perfumeStoryMock.posts[2].id]}
                  </p>
                  <p className="mb-2 text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[2].id]?.summary}
                  </p>
                  <p className="text-muted-foreground">
                    {storyDetails[perfumeStoryMock.posts[2].id]?.teaser}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
