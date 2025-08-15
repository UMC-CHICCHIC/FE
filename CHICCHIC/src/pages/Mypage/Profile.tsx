import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLogout } from "../../utils/useLogout";
import { getUserInfo, getProfileImage } from "../../apis/auth";
import { useAuthStore } from "../../store/useAuthStore";

const DEFAULT_PROFILE_IMAGE = "https://aws-chicchic-bucket.s3.ap-northeast-2.amazonaws.com/default-profile.png";

export default function MyHome() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const logout = useLogout();
  const isLogoutLoading = false;

  // zustand 전역 상태 사용
  const { user, setUser, isLoggedIn } = useAuthStore();

  const [isUserInfoLoading, setIsUserInfoLoading] = useState(true);
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_PROFILE_IMAGE);

  // 전역 상태에서 닉네임 가져오기
  const userNickname = user?.nickname || "(닉네임)";

  useEffect(() => {
    if (!user || !user.nickname) {
      getUserInfo()
        .then((res) => {
          if (res.data?.result) {
            const userData = res.data.result;
            setUser({
              email: userData.email,
              phoneNumber: userData.phoneNumber || "",
              nickname: userData.nickname,
            });
          }
        })
        .catch(() => {
          console.error("사용자 정보를 불러올 수 없습니다.");
        })
        .finally(() => {
          setIsUserInfoLoading(false);
        });
    } else {
      setIsUserInfoLoading(false);
    }

    // 프로필 이미지는 별도의 api에서 처리하기 때문에 따로
    setIsProfileImageLoading(true);
    getProfileImage()
      .then((res) => {
        const url = res.data.result;
        setProfileImage(url && url.trim() ? url : DEFAULT_PROFILE_IMAGE);
      })
      .catch(() => {
        setProfileImage(DEFAULT_PROFILE_IMAGE);
      })
      .finally(() => {
        setIsProfileImageLoading(false);
      });
  }, [user, setUser]);
  
  if (!isLoggedIn()) {
    navigate("/login");
    return null;
  }

  const handleProfileClick = () => navigate("/mypage");
  const handlePrivacyClick = () => navigate("/mypage/privacy");
  const handleScrapsClick = () => navigate("/mypage/scraps");
  const handleDiariesClick = () => navigate("/community/diary/my-diary");

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="font-pretendard min-h-[calc(100vh-64px)] bg-transparent text-[#a8342f] flex flex-col sm:flex-row">
      {/* 사이드 탭 */}
      <div className="w-full sm:w-80 border-b sm:border-b-0 sm:border-r border-[#AB3130] pt-5 sm:pt-20 flex flex-row sm:flex-col justify-center items-center sm:items-stretch sm:justify-stretch sm:min-h-[calc(100vh-64px)]">
        <ul className="flex flex-row sm:flex-col w-full sm:w-auto gap-0 sm:gap-13 text-2xl text-[#AB3130] items-center justify-between sm:items-stretch sm:justify-stretch">
          <li className="flex-1 sm:flex-none">
            <button 
              onClick={handleProfileClick}
              className={`flex items-center justify-center w-full h-16 text-center cursor-pointer
                ${currentPath === '/mypage'
                  ? 'font-semibold border-b-4 sm:border-b-0 sm:border-r-4 border-[#AB3130] opacity-100'
                  : 'font-semibold opacity-50 hover:opacity-75'
                }`}
            >
              프로필
            </button>
          </li>
          <li className="flex-1 sm:flex-none">
            <button 
              onClick={handlePrivacyClick}
              className={`flex items-center justify-center w-full h-16 text-center cursor-pointer
                ${currentPath === '/mypage/privacy'
                  ? 'font-semibold border-b-4 sm:border-b-0 sm:border-r-4 border-[#AB3130] opacity-100'
                  : 'font-semibold opacity-50 hover:opacity-75'
                }`}
            >
              개인정보
            </button>
          </li>
        </ul>
      </div>
      <main className="flex-1 flex flex-col items-center justify-start pt-16 px-8 sm:items-start sm:ml-20">
        <div className="w-55 h-55 rounded-full flex items-center justify-center mb-6 mt-10 overflow-hidden">
          {isProfileImageLoading ? (
            <div className="w-full h-full object-cover rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <img
              src={profileImage} 
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          )}
        </div>

        <div className="text-3xl mt-5 font-semibold mb-2 text-center sm:text-left">
          {isUserInfoLoading ? (
            <div className="w-60 h-10 bg-gray-200 animate-pulse rounded-md" />
          ) : (
            `안녕하세요, ${userNickname}님!`
          )}
        </div>

        <button 
          onClick={handleLogout}
          disabled={isLogoutLoading}
          className={`text-base mt-2 underline text-[#AB3130] cursor-pointer bg-transparent border-none transition-opacity ${
            isLogoutLoading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-75'
          }`}
        >
          {isLogoutLoading ? '로그아웃 중...' : '로그아웃'}
        </button>

        <div className="text-xl font-semibold mt-18">페이지 바로가기</div>

        <div className="flex flex-col lg:flex-row gap-6 xl:gap-25 mt-10 mb-25 text-lg font-light">
          <button
            onClick={handleScrapsClick}
            className="bg-[#AB3130] text-[#FFFFFF] px-18 py-2 rounded-full cursor-pointer hover:bg-[#8b2a25] transition-colors"
          >
            나의 스크랩
          </button>
          <button
            onClick={handleDiariesClick}
            className="bg-[#AB3130] text-[#FFFFFF] px-16 py-2 rounded-full cursor-pointer hover:bg-[#8b2a25] transition-colors"
          >
            작성한 일기장
          </button>
        </div>
      </main>
    </div>
  );
}