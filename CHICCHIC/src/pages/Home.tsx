import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PerfumeGrid } from "../components/PersonalPerfumeTest/perfume-grid";
import mainlogo2 from "../assets/images/main-logo.png";
import mainpage from "../assets/images/mainpage.png";

export default function Home() {
  // 인증 상태 확인 (실제로는 Context나 상태관리에서 가져옴)
  const isAuthenticated = true; // 실제 로그인 상태로 변경

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
          {/* 배경 이미지 레이어 */}
          <img
            src={mainpage}
            alt="CHICCHIC perfume bottle"
            className="hidden md:block absolute right-0 top-0 h-full w-full object-cover object-left z-10"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="flex md:translate-x-8 md:-translate-y-10">
              {/* 왼쪽 텍스트 영역 */}
              <div className="w-full md:w-1/2 text-center md:text-left py-16">
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

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mt-2">
                  CHICCHIC.
                </h1>

                <p className="text-xl md:text-lg text-[#AB3130] mt-6 leading-relaxed">
                  나를 더 CHIC하게 드러내는 법,
                  <br />
                  CHICCHIC에서 시작하세요.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-8">
                  {!isAuthenticated ? (
                    // 비로그인 상태 버튼
                    <>
                      <Link
                        to="/login"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
                      >
                        <span>로그인/회원가입</span>
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link
                        to="/personal-perfume/test"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#66191F] transition-colors w-full sm:w-auto"
                      >
                        <span>퍼스널 향수 테스트</span>
                        <ChevronRight className="h-5 w-5" />
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
                        <ChevronRight className="h-5 w-5" />
                      </Link>
                      <Link
                        to="/personal-perfume/test"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
                      >
                        <span>퍼스널 향수 테스트</span>
                        <ChevronRight className="h-5 w-5" />
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
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
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
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PerfumeGrid />
          </div>
        </section>

        {/* --- Personal Perfume List Section --- */}
        {isAuthenticated ? (
          <section id="personal-perfume-list" className="py-16 bg-[#F8F5F2]">
            <div className="container mx-auto px-4">
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
            <div className="container mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Personal perfume List
                </h2>
                <p className="text-muted-foreground">
                  퍼스널 향수 추천 테스트 결과에 따라 추천된 향수입니다.
                </p>
              </div>
            </div>
            <div className="container mx-auto px-4 text-center">
              <div className="max-w-lg md:max-w-4xl lg:max-w-6xl xl:max-w-7xl 2xl:max-w-full mx-auto bg-white border-2 border-[#AB3130] rounded-lg p-6 md:p-10 lg:p-12">
                <div className="mb-6 md:mb-8">
                  <div className="mx-auto mb-4 md:mb-6 flex items-center justify-center">
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
                  <p className="text-gray-600 text-base md:text-lg lg:text-xl xl:text-2xl mb-6 md:mb-8 leading-relaxed px-2 max-w-4xl mx-auto">
                    퍼스널 향수 추천 테스트를 진행 후, 나에게 어울리는 향수를
                    추천 받아보세요!
                    <br />
                    <span className="block mt-1">
                      (로그아웃 상태일 경우 로그인 후 진행으로 이동됩니다.)
                    </span>
                  </p>
                  <Link
                    to="/personal-perfume/test"
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
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8 border-t border-gray-300 pt-12">
              <div>
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Perfume Story
                </h2>
                <p className="text-muted-foreground">
                  향수에 대해 궁금증이 생긴다면?
                </p>
              </div>
              <Link
                to="/PerfumeStory"
                className="text-[#AB3130] font-semibold flex items-center gap-1 text-xl"
              >
                <span>향수 이야기에서 더 다양한 소식 확인하기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="space-y-16">
              {/* Story Item 1 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="ancient egypt perfume"
                    alt="History of perfume in ancient Egypt"
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    신들의 향기, 고대 이집트에서 시작된 향수의 역사
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
                  </p>
                  <p className="text-muted-foreground">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
                  </p>
                </div>
              </div>
              {/* Story Item 2 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="ancient egypt perfume"
                    alt="History of perfume in ancient Egypt"
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    제목제목
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
                  </p>
                  <p className="text-muted-foreground">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
                  </p>
                </div>
              </div>
              {/* Story Item 3 */}
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="perfume bottle art"
                    alt="Perfume story placeholder"
                    width={600}
                    height={400}
                    className="object-cover w-full rounded-lg bg-gray-300"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">
                    제목제목제목제목
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
                  </p>
                  <p className="text-muted-foreground">
                    내용요약내용요약내용요약내용요약내용요약내용요약내용요약
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
