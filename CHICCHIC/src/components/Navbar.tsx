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
    <nav className="sticky top-0 z-50 w-full bg-[#AB3130] text-[#F7F4EF] font-[pretendard] px-4 py-3">
      <div className="flex items-center h-16">
        {/* 로고 */}
        <div className="flex items-center flex-shrink-0">
          <img
            src={mainlogo}
            className="w-auto h-16 cursor-pointer"
            alt="CHICCHIC Logo"
            onClick={() => go("/")}
          />
        </div>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden lg:flex items-center ml-16 space-x-6 text-base font-light flex-shrink-0">
          <li><button onClick={() => go("/shopping")} className="hover:text-red-200  cursor-pointer">SHOPPING</button></li>
          <li><button onClick={() => go("/community")} className="hover:text-red-200 cursor-pointer">COMMUNITY</button></li>
          <li><button onClick={() => go("/personal-perfume/test")} className="whitespace-nowrap hover:text-red-200 cursor-pointer">PERSONAL PERFUME TEST</button></li>
          <li><button onClick={() => go("/brand")} className="hover:text-red-200 cursor-pointer">BRAND</button></li>
        </ul>

        <div className="flex-grow"></div>

        {/* 검색바 */}
        <div className="relative hidden sm:block mr-4">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-1 text-sm border rounded-3xl w-48 lg:w-56 xl:w-72 focus:outline-none bg-transparent text-[#F7F4EF] border-[#F7F4EF]"
          />
          <button className="absolute transform -translate-y-1/2 right-3 top-1/2">
            <svg
              className="w-4 h-3 cursor-pointer"
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
        <div className="flex items-center gap-4 flex-shrink-0">
          <button onClick={() => go("/scrap")} className="hover:text-red-200 cursor-pointer">
            <img src={scraplogo} className="w-[18px] h-[24px]" alt="scrap" />
          </button>
          <button onClick={() => go("/mypage")} className="hover:text-red-200 cursor-pointer">
            <img src={myhomelogo} className="w-[19px] h-[23px]" alt="mypage" />
          </button>

          {/* 햄버거 바 */}
          <button className="block lg:hidden ml-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* 드롭다운 메뉴 */}
      <div className={`lg:hidden absolute top-full left-0 w-full bg-[#AB3130]/80 z-40 shadow-lg border-red-400/20 transition-all duration-300 ease-in-out overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 space-y-4">
          <button onClick={() => go("/shopping")} className="block w-full text-left text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">SHOPPING</button>
          <button onClick={() => go("/community")} className="block w-full text-left text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">COMMUNITY</button>
          <button onClick={() => go("/personal-perfume/test")} className="block w-full text-left font-light text-base hover:text-red-200 py-2 transition-colors cursor-pointer">PERSONAL PERFUME TEST</button>
          <button onClick={() => go("/brand")} className="block w-full text-left text-base font-light hover:text-red-200 py-2 transition-colors cursor-pointer">BRAND</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
