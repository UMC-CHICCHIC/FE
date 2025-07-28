import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PerfumeGrid } from "./PersonalPerfume/perfume-grid";
import mainlogo2 from '../assets/images/main-logo.png';
import mainbackground from '../assets/images/main_background.png';
import mainpage from '../assets/images/mainpage.png';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* --- Hero Section --- */}
        <section className="bg-[#66191F] text-white min-h-screen flex items-center relative overflow-hidden">
          {/* 배경 이미지 레이어 */}
          <img
            src={mainbackground}
            alt="CHICCHIC background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-30 z-8"
          />
          
          {/* 그라데이션 오버레이 레이어 */}
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#66191F]/90 via-[#66191F]/60 to-transparent" />

          <img
            src={mainpage}
            alt="CHICCHIC perfume bottle"
            className="hidden md:block absolute right-0 top-0 h-full w-7/8 object-cover object-center z-10"
          />

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
            <div className="flex md:translate-x-8 md:-translate-y-10">
              {/* 왼쪽 텍스트 영역 */}
              <div className="w-full md:w-1/2 text-center md:text-left py-16">
                <img
                  src={mainlogo2}
                  alt="CHICCHIC Brand Logo"
                  className="w-30 h-30 md:w-60 md:h-60 object-contain mx-auto md:mx-0 md:-ml-20 mb-[-20px]"
                  style={{ filter: 'brightness(0) saturate(100%) invert(29%) sepia(72%) saturate(1347%) hue-rotate(330deg) brightness(91%) contrast(94%)' }}
                />

                {/* 텍스트 영역 */}
                <div className="space-y-2 "> 
                  <h2 className="text-2xl md:text-3xl font-light text-[#AB3130]">
                    How to reveal yourself
                  </h2>
                  <h2 className="text-2xl md:text-3xl font-light text-[#AB3130]">
                    more CHIC,
                  </h2>
                  <p className="text-xl md:text-3xl font-light text-[#AB3130] pt-4">start with</p>
                </div>

                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mt-2">
                  CHICCHIC.
                </h1>

                <p className="text-base md:text-lg text-white mt-6 leading-relaxed">
                  나를 더 CHIC하게 드러내는 법,<br />
                  CHICCHIC에서 시작하세요.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-8">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
                  >
                    <span>로그인/회원가입</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/personal-perfume/test"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors w-full sm:w-auto"
                  >
                    <span>퍼스널 향수 테스트</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Popular Products Section --- */}
        <section id="collection" className="py-12 md:py-16 bg-[#F7F4EF]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Popular Products
                </h2>
                <p className="text-muted-foreground text-[#AB3130]">현재 가장 인기 있는 향수들을 둘러보세요.</p>
              </div>
              <Link to="/PopularProductsList" className="text-[#AB3130] font-semibold flex items-center justify-center gap-1 shrink-0">
                <span>인기 향수 더보기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PerfumeGrid />
          </div>
        </section>

        {/* --- Personal Perfume List Section --- */}
        <section id="personal-perfume-list" className="py-12 md:py-16 bg-[#F8F5F2]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center sm:text-left mb-8">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#AB3130] mb-2">
                Personal perfume List
              </h2>
              <p className="text-muted-foreground">
                퍼스널 향수 추천 테스트 결과에 따라 추천된 향수입니다.
              </p>
            </div>
            <PerfumeGrid />
          </div>
        </section>

        {/* --- Perfume Story Section --- */}
        <section id="perfume-story" className="pt-8 pb-12 md:pb-16 bg-[#F8F5F2]">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-8 border-t border-gray-300 pt-12">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-3xl md:text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Perfume Story
                </h2>
                <p className="text-muted-foreground">향수에 대해 궁금증이 생긴다면?</p>
              </div>
              <Link to="/story" className="text-[#AB3130] font-semibold flex items-center justify-center gap-1 text-sm shrink-0">
                <span>향수 이야기에서 더 다양한 소식 확인하기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-12 md:space-y-16">
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
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-[#AB3130] mb-4">신들의 향기, 고대 이집트에서 시작된 향수의 역사</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

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
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-[#AB3130] mb-4">제목제목</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
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
                <div className="w-full md:w-1/2 text-center md:text-left">
                  <h3 className="text-xl md:text-2xl font-headline font-bold text-[#AB3130] mb-4">제목제목제목제목</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}