import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import { PerfumeGrid } from "../components/PersonalPerfumeTest/perfume-grid";
import mainlogo2 from "../assets/images/main-logo.png";
import mainpage from "../assets/images/mainpage.png";
import { perfumeStoryMock } from "../mocks/perfumeStroyMock";

export default function Home() {
  // 인증 상태 확인 (실제로는 Context나 상태관리에서 가져옴)
  const isAuthenticated = false; // 실제 로그인 상태로 변경
  
  // 로딩 상태 관리
  const [isLoading, setIsLoading] = useState(true);

  // 컴포넌트 마운트 시 로딩 시뮬레이션
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 150); // 150ms 후 로딩 완료

    return () => clearTimeout(timer);
  }, []);

  // 로딩 중일 때 스켈레톤 UI 표시
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {/* Hero Section 스켈레톤 */}
          <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
            <div className="container relative z-30 px-4 mx-auto sm:px-6 lg:px-8">
              <div className="flex md:translate-x-8 md:-translate-y-10">
                <div className="w-full py-16 text-center md:w-1/2 md:text-left">
                  {/* 로고 스켈레톤 */}
                  <div className="w-48 h-48 md:w-60 md:h-60 bg-gray-300/20 rounded-lg mx-auto md:mx-0 md:-ml-20 mb-4 animate-pulse"></div>
                  
                  {/* 텍스트 스켈레톤 */}
                  <div className="space-y-4 mb-6">
                    <div className="h-8 bg-gray-300/20 rounded-md w-3/4 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-8 bg-gray-300/20 rounded-md w-2/3 mx-auto md:mx-0 animate-pulse"></div>
                    <div className="h-8 bg-gray-300/20 rounded-md w-1/2 mx-auto md:mx-0 animate-pulse"></div>
                  </div>
                  
                  {/* 메인 타이틀 스켈레톤 */}
                  <div className="h-20 bg-gray-300/20 rounded-md w-full mb-6 animate-pulse"></div>
                  
                  {/* 설명 텍스트 스켈레톤 */}
                  <div className="space-y-2 mb-8">
                    <div className="h-6 bg-gray-300/20 rounded-md w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-300/20 rounded-md w-4/5 animate-pulse"></div>
                  </div>
                  
                  {/* 버튼 스켈레톤 */}
                  <div className="flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
                    <div className="h-12 bg-gray-300/20 rounded-md w-48 animate-pulse"></div>
                    <div className="h-12 bg-gray-300/20 rounded-md w-48 animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 로딩 스피너 중앙 배치 */}
            <div className="absolute inset-0 flex items-center justify-center z-40">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-xl">페이지를 불러오는 중입니다...</p>
              </div>
            </div>
          </section>

          {/* Popular Products Section 스켈레톤 */}
          <section className="py-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <div className="h-10 bg-gray-300 rounded-md w-64 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded-md w-80 animate-pulse"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-md w-32 animate-pulse"></div>
              </div>
              
              {/* 상품 그리드 스켈레톤 */}
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="flex flex-col group">
                    <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-300 animate-pulse rounded-lg" />
                    <div className="text-left space-y-2">
                      <div className="w-3/4 h-6 mb-1 bg-gray-300 rounded animate-pulse" />
                      <div className="w-1/2 h-4 bg-gray-300 rounded animate-pulse" />
                      <div className="w-1/3 h-4 bg-gray-300 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Personal Perfume Section 스켈레톤 */}
          <section className="py-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="mb-8">
                <div className="h-10 bg-gray-300 rounded-md w-72 mb-2 animate-pulse"></div>
                <div className="h-6 bg-gray-300 rounded-md w-96 animate-pulse"></div>
              </div>
              
              {/* 콘텐츠 영역 스켈레톤 */}
              <div className="max-w-4xl mx-auto bg-white border-2 border-gray-300 rounded-lg p-10">
                <div className="text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded-md w-3/4 mx-auto animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-6 bg-gray-300 rounded-md w-full animate-pulse"></div>
                    <div className="h-6 bg-gray-300 rounded-md w-5/6 mx-auto animate-pulse"></div>
                  </div>
                  <div className="h-12 bg-gray-300 rounded-full w-64 mx-auto animate-pulse"></div>
                </div>
              </div>
            </div>
          </section>

          {/* Perfume Story Section 스켈레톤 */}
          <section className="pt-8 pb-16 bg-[#F8F5F2]">
            <div className="container px-4 mx-auto">
              <div className="flex items-center justify-between pt-12 mb-8 border-t border-gray-300">
                <div>
                  <div className="h-10 bg-gray-300 rounded-md w-64 mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-300 rounded-md w-48 animate-pulse"></div>
                </div>
                <div className="h-6 bg-gray-300 rounded-md w-80 animate-pulse"></div>
              </div>
              
              <div className="space-y-16">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="flex flex-col items-center gap-8 md:flex-row md:gap-12">
                    <div className="w-full md:w-1/2">
                      <div className="w-full h-64 bg-gray-300 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      <div className="h-8 bg-gray-300 rounded-md w-4/5 animate-pulse"></div>
                      <div className="h-5 bg-gray-300 rounded-md w-full animate-pulse"></div>
                      <div className="h-5 bg-gray-300 rounded-md w-5/6 animate-pulse"></div>
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
        {/* --- Hero Section --- */}
        <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
          {/* 배경 이미지 레이어 */}
          <img
            src={mainpage}
            alt="CHICCHIC perfume bottle"
            className="absolute top-0 right-0 z-10 hidden object-cover object-left w-full h-full md:block"
          />

          <div className="container relative z-30 px-4 mx-auto sm:px-6 lg:px-8">
            <div className="flex md:translate-x-8 md:-translate-y-10">
              {/* 왼쪽 텍스트 영역 */}
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

                {/* 텍스트 영역 */}
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
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
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
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
                      >
                        <span>마이페이지</span>
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                      <Link
                        to="/personal-perfume/test"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
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
                    {perfumeStoryMock.posts[0].title} {perfumeStoryMock.posts[0].description}
                  </h3>
                  <p className="mb-2 text-muted-foreground">
                    {perfumeStoryMock.posts[0].description}
                  </p>
                  <p className="text-muted-foreground">
                    {perfumeStoryMock.posts[0].description}
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
                    {perfumeStoryMock.posts[1].title} {perfumeStoryMock.posts[1].description}
                  </h3>
                  <p className="mb-2 text-muted-foreground">
                    {perfumeStoryMock.posts[1].description}
                  </p>
                  <p className="text-muted-foreground">
                    {perfumeStoryMock.posts[1].description}
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
                    {perfumeStoryMock.posts[2].title} {perfumeStoryMock.posts[2].description}
                  </h3>
                  <p className="mb-2 text-muted-foreground">
                    {perfumeStoryMock.posts[2].description}
                  </p>
                  <p className="text-muted-foreground">
                    {perfumeStoryMock.posts[2].description}
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
