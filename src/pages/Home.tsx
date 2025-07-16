import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { PerfumeGrid } from "./PersonalPerfume/perfume-grid";
import mainlogo from'../assets/icons/main-logo.svg'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="bg-[#4A1419] text-white min-h-screen flex items-center relative overflow-hidden">
          {/* 배경 이미지 */}
          <div className="absolute inset-0 z-0">
            <img
              src="/mainpage.PNG"
              alt="Background perfume"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#4A1419]/10"></div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              {/* 왼쪽 텍스트 영역 */}
              <div className="md:w-1/2 py-12 md:py-24 text-left space-y-8">
                <img 
                  src={mainlogo}
                  alt="CHICCHIC Brand Logo"
                  className="w-48 h-48 object-contain"
                />
                <div className="space-y-3">
                  <h2 className="text-3xl font-light font-headline text-[#AB3130]">
                    How to reveal yourself
                  </h2>
                  <h2 className="text-3xl font-light font-headline text-[#AB3130]">
                    more CHIC,
                  </h2>
                  <p className="text-2xl font-light text-[#D9A0A0]">start with</p>
                </div>
                <h1 className="text-6xl font-bold font-headline tracking-tight text-white">
                  CHICCHIC.
                </h1>
                <p className="text-lg text-[#AB3130] mt-4">
                  나를 더 CHIC하게 드러내는 법,<br />
                  CHICCHIC에서 시작하세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors"
                  >
                    <span>로그인/회원가입</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                  <Link
                    to="/personal-perfume/test"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#AB3130]/80 rounded-md text-base font-semibold text-white hover:bg-[#D9A0A0] transition-colors"
                  >
                    <span>퍼스널 향수 테스트</span>
                    <ChevronRight className="h-5 w-5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="collection" className="py-16 bg-[#F8F5F2]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Popular Products
                </h2>
                <p className="text-muted-foreground">현재 가장 인기 있는 향수들을 둘러보세요.</p>
              </div>
              <Link to="/shopping" className="text-[#AB3130] font-semibold flex items-center gap-1">
                <span>인기 향수 더보기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {<PerfumeGrid /> }
          </div>
        </section>

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
            {<PerfumeGrid /> }
          </div>
        </section>

        <section id="perfume-story" className="pt-8 pb-16 bg-[#F8F5F2]">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8 border-t border-gray-300 pt-12">
              <div>
                <h2 className="text-4xl font-headline font-bold text-[#AB3130] mb-2">
                  Perfume Story
                </h2>
                <p className="text-muted-foreground">향수에 대해 궁금증이 생긴다면?</p>
              </div>
              <Link to="/story" className="text-[#AB3130] font-semibold flex items-center gap-1 text-sm">
                <span>향수 이야기에서 더 다양한 소식 확인하기</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="ancient egypt perfume"
                    alt="History of perfume in ancient Egypt"
                    width={600}
                    height={400}
                    className="object-cover w-full"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">신들의 향기, 고대 이집트에서 시작된 향수의 역사</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="perfume ingredients"
                    alt="Perfume story placeholder"
                    width={600}
                    height={400}
                    className="object-cover w-full bg-gray-300"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">제목제목제목제목</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img
                    src="https://placehold.co/600x400.png"
                    data-ai-hint="perfume bottle art"
                    alt="Perfume story placeholder"
                    width={600}
                    height={400}
                    className="object-cover w-full bg-gray-300"
                  />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">제목제목제목제목</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground py-6">
        <div className="container mx-auto text-center text-sm">
          <p>&copy; {new Date().getFullYear()} ⓒ 2025 CHICCHIC. All right reserved.</p>
          <p> Privacy Policy | Terms of Service | Contact</p>
        </div>
      </footer>
    </div>
  );
}