import { Header } from "../layouts/Header";
import { PerfumeGrid } from "../component/Product/main/perfume-grid";
import { Link } from "react-router-dom";
import { LuArrowRight, LuChevronRight } from "react-icons/lu";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="bg-[#66191F] text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 py-12 md:py-24 text-left">
                <svg
                  className="mb-4 h-16 w-16 text-[#D9A0A0]"
                  viewBox="0 0 58 64"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M29 0C13.01 0 0 11.64 0 26C0 35.89 4.31 43.58 12.43 49.34C11.59 47.2 11.11 45.11 11.11 43C11.11 33.61 18.97 26 29 26C39.03 26 46.89 33.61 46.89 43C46.89 46.25 45.91 49.25 44.33 51.74C45.8 51.9 47.33 52 49 52C53.97 52 58 48.07 58 43C58 19.25 45.49 0 29 0ZM29 50C20.18 50 13.11 42.93 13.11 34C13.11 31.89 13.6 29.74 14.41 27.81C20.65 29.43 28.53 32.74 33.69 39.54C32.19 45.83 29.89 50 29 50Z" />
                </svg>
                <h2 className="text-2xl font-light font-headline text-[#AB3130]">
                  How to reveal yourself
                </h2>
                <h2 className="text-2xl font-light font-headline mb-4 text-[#AB3130]">
                  more CHIC,
                </h2>
                <p className="text-lg mb-4 font-light text-[#D9A0A0]">start with</p>
                <h1 className="text-7xl font-bold font-headline mb-6 tracking-tight bg-gradient-to-r from-white to-[#F7F4EF] bg-clip-text text-transparent">
                  CHICCHIC.
                </h1>
                <p className="mb-8 text-[#AB3130]">
                  나를 더 CHIC하게 드러내는 법, CHICCHIC에서 시작하세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/login"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D9A0A0]/80 rounded-md text-sm font-semibold text-white hover:bg-[#D9A0A0] transition-colors"
                  >
                    <span>로그인/회원가입</span>
                    <LuChevronRight className="h-4 w-4" />
                  </Link>
                  <Link
                    to="/personal-perfume-test"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D9A0A0]/80 rounded-md text-sm font-semibold text-white hover:bg-[#D9A0A0] transition-colors"
                  >
                    <span>퍼스널 향수 테스트</span>
                    <LuChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
              <div className="md:w-1/2 flex items-center justify-center relative">
                <img
                  src="https://placehold.co/600x800.png"
                  alt="A hand reaching for a perfume bottle"
                  width={600}
                  height={800}
                  className="object-cover"
                  style={{ maxWidth: "100%", height: "auto" }}
                />
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
                <LuArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <PerfumeGrid />
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
            <PerfumeGrid />
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
              <Link to="/perfume-story" className="text-[#AB3130] font-semibold flex items-center gap-1 text-sm">
                <span>향수 이야기에서 더 다양한 소식 확인하기</span>
                <LuArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="space-y-16">
              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img src="https://placehold.co/600x400.png" alt="History of perfume in ancient Egypt" width={600} height={400} className="object-cover w-full" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">신들의 향기, 고대 이집트에서 시작된 향수의 역사</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img src="https://placehold.co/600x400.png" alt="History of perfume in ancient Egypt" width={600} height={400} className="object-cover w-full" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">신들의 향기, 고대 이집트에서 시작된 향수의 역사</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img src="https://placehold.co/600x400.png" alt="Perfume story placeholder" width={600} height={400} className="object-cover w-full bg-gray-300" />
                </div>
                <div className="w-full md:w-1/2 text-left">
                  <h3 className="text-2xl font-headline font-bold text-[#AB3130] mb-4">제목제목제목제목</h3>
                  <p className="text-muted-foreground mb-2">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                  <p className="text-muted-foreground">내용요약내용요약내용요약내용요약내용요약내용요약내용요약</p>
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                <div className="w-full md:w-1/2">
                  <img src="https://placehold.co/600x400.png" alt="Perfume story placeholder" width={600} height={400} className="object-cover w-full bg-gray-300" />
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