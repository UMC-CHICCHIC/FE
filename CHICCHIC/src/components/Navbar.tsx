import { useState } from "react";
import { useNavigate } from "react-router-dom";
import mainlogo from "../assets/icons/main-logo.svg";
import myhomelogo from "../assets/icons/myhome-logo.svg";
import scraplogo from "../assets/icons/scrap-logo.svg";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleShoppingClick = () => {
    navigate("/shopping");
  };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  const handlePersonalPerfumeClick = () => {
    navigate("/personal-perfume/test");
  };

  const handleBrandClick = () => {
    navigate("/brand");
  };

  const handleScrapClick = () => {
    navigate("/scrap");
  };

  const handleProfileClick = () => {
    navigate("/mypage");
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full px-4 py-3 font-pretendard"
      style={{ backgroundColor: "#AB3130", color: "#F7F4EF" }}
    >
      <div className="flex items-center justify-between h-16">
        {/* 로고와 메뉴 그룹 */}
        <div className="flex items-center space-x-20">
          <img
            src={mainlogo}
            className="w-auto h-16 cursor-pointer"
            alt="CHICCHIC Logo"
            onClick={handleLogoClick}
          ></img>

          {/* 네비게이션 메뉴 */}
          <ul
            className="flex items-center space-x-8 text-base list-none"
            style={{ color: "#F7F4EF" }}
          >
            <li>
              <button
                onClick={handleShoppingClick}
                className="transition-colors cursor-pointer hover:text-red-200"
              >
                SHOPPING
              </button>
            </li>

            <li>
              <button
                onClick={handleCommunityClick}
                className="transition-colors cursor-pointer hover:text-red-200"
              >
                COMMUNITY
              </button>
            </li>

            <li>
              <button
                onClick={handlePersonalPerfumeClick}
                className="transition-colors cursor-pointer hover:text-red-200"
              >
                PERSONAL PERFUME TEST
              </button>
            </li>

            <li>
              <button
                onClick={handleBrandClick}
                className="transition-colors cursor-pointer hover:text-red-200"
              >
                BRAND
              </button>
            </li>
          </ul>
        </div>

        {/* 검색바와 사용자 메뉴 */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-1 text-sm border rounded-3xl w-70 focus:outline-none"
              style={{
                borderColor: "#F7F4EF",
                color: "#F7F4EF",
                backgroundColor: "transparent",
              }}
            />
            <button className="absolute transform -translate-y-1/2 right-3 top-1/2">
              <svg
                className="w-4 h-3 cursor-pointer"
                style={{ color: "#F7F4EF" }}
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

          {/* 북마크 아이콘 */}
          <button
            onClick={handleScrapClick}
            className="p-2 ml-20 transition-colors cursor-pointer hover:text-red-200"
          >
            <img src={scraplogo} className="w-[18px] h-[24px]"></img>
          </button>

          {/* 사용자 아이콘 */}
          <button
            onClick={handleProfileClick}
            className="p-2 transition-colors cursor-pointer hover:text-red-200"
          >
            <img src={myhomelogo} className="w-[19px] h-[23px]"></img>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
