import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function MyHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  
  // 닉네임 상태 관리 (API 연동 준비)
  const [userNickname, setUserNickname] = useState("(닉네임)");

  const handleProfileClick = () => {
    navigate('/mypage');
  };

  const handlePrivacyClick = () => {
    navigate('/mypage/privacy');
  };

  const handleLogoutClick = () => {
    // 로그아웃 로직 (예: 토큰 삭제, 상태 초기화 등)
    navigate('/');
  };

  const handleScrapsClick = () => {
    navigate('/mypage/scraps');
  };

  const handleDiariesClick = () => {
    navigate('/mypage/diaries');
  };

  return (
    <div className="font-pretendard flex min-h-[calc(100vh-64px)] bg-transparent text-[#AB3130]">
      {/* 사이드 탭 */}
      <div className="w-97 border-r border-[#AB3130] pt-20 flex flex-col i">
        <ul className="space-y-13 text-2xl text-[#AB3130] w-full">
          <li>
            <button 
              onClick={handleProfileClick}
              className={`block w-full text-center relative pr-5 py-2 cursor-pointer ${
                currentPath === '/mypage' 
                  ? 'font-bold border-r-4 border-[#AB3130] opacity-100' 
                  : 'opacity-50 hover:opacity-75'
              }`}
            >
              프로필
            </button>
          </li>
          <li>
            <button 
              onClick={handlePrivacyClick}
              className={`block w-full text-center cursor-pointer ${
                currentPath === '/mypage/privacy' 
                  ? 'font-bold border-r-4 border-[#AB3130] opacity-100 py-2' 
                  : 'opacity-50 hover:opacity-75'
              }`}
            >
              개인정보
            </button>
          </li>
        </ul>
      </div>

      <main className="flex-1 flex flex-col items-start justify-start pt-16 px-8 ml-20">
        <div className="w-55 h-55 rounded-full bg-gray-300 flex items-center justify-center mb-6 mt-20">
        </div>

        <div className="text-3xl mt-5 font-semibold mb-2">안녕하세요, {userNickname} 님!</div>
        <button 
          onClick={handleLogoutClick}
          className="text-base mt-2 underline text-[#AB3130] cursor-pointer bg-transparent border-none"
        >
          로그아웃
        </button>

        <div className="text-xl font-semibold mt-18">페이지 바로가기</div>
        <div className="flex flex-col lg:flex-row gap-6 ml:gap-35 mt-7 mb-45 text-xl font-light">
          <button
            onClick={handleScrapsClick}
            className=" bg-[#AB3130] text-white px-20 py-3 rounded-full cursor-pointer hover:bg-[#8b2a25] transition-colors"
          >
            나의 스크랩
          </button>
          <button
            onClick={handleDiariesClick}
            className=" bg-[#AB3130] text-white px-20 py-3 rounded-full cursor-pointer hover:bg-[#8b2a25] transition-colors"
          >
            작성한 일기장
          </button>
        </div>
      </main>
    </div>
  );
}