import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import mainlogo from "../assets/icons/main-logo.svg";
import myhomelogo from "../assets/icons/myhome-logo.svg";
import scraplogo from "../assets/icons/scrap-logo.svg";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const go = (path: string) => {
    navigate(path);
    setMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#AB3130] text-[#F7F4EF] font-[pretendard] px-2 sm:px-4 py-2 sm:py-3">
      <div className="flex items-center h-12 sm:h-16">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <img
            src={mainlogo}
            className="w-auto h-10 sm:h-16 cursor-pointer"
            alt="CHICCHIC Logo"
            onClick={() => go("/")}
          />
        </div>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center ml-8 xl:ml-16 space-x-4 xl:space-x-6 text-sm xl:text-base font-light flex-shrink-0">
          <li><button onClick={() => go("/shopping")} className="hover:text-red-200  cursor-pointer">SHOPPING</button></li>
          <li><button onClick={() => go("/community")} className="hover:text-red-200 cursor-pointer">COMMUNITY</button></li>
          <li><button onClick={() => go("/personal-perfume/test")} className="whitespace-nowrap hover:text-red-200 cursor-pointer">PERSONAL PERFUME TEST</button></li>
          <li><button onClick={() => go("/brand")} className="hover:text-red-200 cursor-pointer">BRAND</button></li>
        </ul>

        <div className="flex-grow"></div>

        {/* 검색바 */}
        <div className="relative hidden md:block mr-2 sm:mr-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 sm:px-4 py-1 text-xs sm:text-sm border rounded-3xl w-32 sm:w-48 lg:w-56 xl:w-72 focus:outline-none bg-transparent text-[#F7F4EF] border-[#F7F4EF]"
          />
          <button className="absolute transform -translate-y-1/2 right-2 sm:right-3 top-1/2">
            <svg
              className="w-3 sm:w-4 h-3 cursor-pointer"
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
          </button>
        </div>

        {/* 아이콘들 - 항상 표시 */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button onClick={() => go('/mypage/scraps')} className="hover:text-red-200 cursor-pointer">
            <img src={scraplogo} className="w-[14px] sm:w-[18px] h-[18px] sm:h-[24px]" alt="scrap" />
          </button>
          <button onClick={() => go("/mypage")} className="hover:text-red-200 cursor-pointer">
            <img src={myhomelogo} className="w-[15px] sm:w-[19px] h-[18px] sm:h-[23px]" alt="mypage" />
          </button>

          {/* 햄버거 바 */}
          <button className="block lg:hidden ml-1 sm:ml-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#AB3130]/80 z-40 shadow-lg border-red-400/20 transition-all duration-300 ease-in-out overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 sm:px-4 py-3 sm:py-4 space-y-3 sm:space-y-4">
          <button onClick={() => go("/shopping")} className="block w-full text-left text-sm sm:text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">SHOPPING</button>
          <button onClick={() => go("/community")} className="block w-full text-left text-sm sm:text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">COMMUNITY</button>
          <button onClick={() => go("/personal-perfume/test")} className="block w-full text-left font-light text-sm sm:text-base hover:text-red-200 py-2 transition-colors cursor-pointer">PERSONAL PERFUME TEST</button>
          <button onClick={() => go("/brand")} className="block w-full text-left text-sm sm:text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">BRAND</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
