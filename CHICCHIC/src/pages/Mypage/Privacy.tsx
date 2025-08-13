import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { 
  getUserInfo, 
  putUserInfo, 
  deleteUserInfo, 
  putProfileImage, 
  getProfileImage,
  deleteProfileImage
} from "../../apis/auth";
import { useImgUploadStore } from "../../store/useProfileImg";
import { useAuthStore } from "../../store/useAuthStore";
import { PrivacySkeleton } from "../../components/skeletons/PrivacySkeleton";
import { clearAuthTokens } from "../../utils/authStorage";

const DEFAULT_PROFILE_IMAGE = "https://aws-chicchic-bucket.s3.ap-northeast-2.amazonaws.com/default-profile.png";

const Privacy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  // zustand에서 사용자 정보 가져오기
  const { user, setUser, logout: storeLogout } = useAuthStore();

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isProfileImageLoading, setIsProfileImageLoading] = useState(true);
  const [formData, setFormData] = useState({
    nickname: '',
    phone: '',
    email: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [isResetToDefault, setIsResetToDefault] = useState(false);

  const { file, previewUrl, setImg, reset } = useImgUploadStore();
  const [profileImage, setProfileImage] = useState<string>(DEFAULT_PROFILE_IMAGE);

  useEffect(() => {
    if (user && user.nickname) {
      setFormData({
        nickname: user.nickname || '',
        phone: user.phoneNumber || '',
        email: user.email || '',
      });
      setIsLoading(false);
    } else {
      getUserInfo()
        .then((res) => {
          const userData = res.data.result;
          const userInfo = {
            email: userData.email,
            phoneNumber: userData.phoneNumber || '',
            nickname: userData.nickname,
          };
          
          setUser(userInfo);

          setFormData({
            nickname: userData.nickname || '',
            phone: userData.phoneNumber || '',
            email: userData.email || '',
          });
        })
        .catch(() => {
          setFormData({
            nickname: '',
            phone: '',
            email: '',
          });
        })
        .finally(() => setIsLoading(false));
    }

    // 프로필 이미지 따로 처리
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

  const handleProfileClick = () => navigate('/mypage');
  const handlePrivacyClick = () => navigate('/mypage/privacy');
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    // 편집 취소 시 상태 리셋
    if (isEditing) {
      setIsResetToDefault(false);
      reset();
    }
  };
  
  const handleImageClick = () => {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
    fileInput?.click();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setImg(f);
      setIsResetToDefault(false);
    }
  };

  const handleResetToDefault = () => {
    setIsResetToDefault(true);
    reset(); // zustand store의 파일 리셋
  };

  const handleSaveClick = async () => {
    setError(null);
    setSaving(true);
    try {
      // 사용자 정보 업데이트
      await putUserInfo({
        nickname: formData.nickname,
        phoneNumber: formData.phone,
      });

      setUser({
        email: formData.email,
        phoneNumber: formData.phone,
        nickname: formData.nickname,
      });

      if (isResetToDefault) {
        setIsProfileImageLoading(true);
        try {
          await deleteProfileImage();
          setProfileImage(DEFAULT_PROFILE_IMAGE);
        } catch (error) {
          console.error("프로필 이미지 삭제 실패:", error);
          setProfileImage(DEFAULT_PROFILE_IMAGE);
        }
        setIsProfileImageLoading(false);
      } else if (file) {
        setIsProfileImageLoading(true);
        const fd = new FormData();
        fd.append("file", file);
        const res = await putProfileImage(fd);

        const newUrl = `${res.data.result}?v=${Date.now()}`;
        setProfileImage(newUrl);
        setIsProfileImageLoading(false);
      }

      reset();
      setIsResetToDefault(false);
      setIsEditing(false);
      
    } catch (err) {
      setError("회원정보 수정에 실패했습니다.");
      setIsProfileImageLoading(false);
    } finally {
      setSaving(false);
    }
  };

  const handleWithdrawClick = async () => {
    const confirmWithdraw = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (!confirmWithdraw) return;

    try {
      await deleteUserInfo();
      clearAuthTokens();
      storeLogout();
      
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (err) {
      setError("회원 탈퇴에 실패했습니다.");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getDisplayImage = () => {
    if (isEditing && isResetToDefault) {
      return DEFAULT_PROFILE_IMAGE;
    }
    if (isEditing && previewUrl) {
      return previewUrl;
    }
    return profileImage;
  };

  return (
    <div className="font-pretendard min-h-[calc(100vh-64px)] bg-transparent text-[#a8342f] flex flex-col sm:flex-row">
      {/* 사이드 탭 */}
      <div className="w-full sm:w-80 border-b sm:border-b-0 sm:border-r border-[#AB3130] pt-5 sm:pt-20 flex flex-row sm:flex-col justify-center items-center sm:items-stretch sm:justify-stretch sm:min-h-[calc(100vh-64px)]">
        <ul className="flex flex-row sm:flex-col w-full sm:w-auto gap-0 sm:gap-13 text-2xl text-[#AB3130] items-center justify-between sm:items-stretch sm:justify-stretch">
          <li className="flex-1 sm:flex-none">
            <button 
              onClick={handleProfileClick}
              className={`flex items-center justify-center w-full h-16 text-center cursor-pointer ${
                currentPath === '/mypage' 
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
              className={`flex items-center justify-center w-full h-16 text-center cursor-pointer ${
                currentPath === '/mypage/privacy' 
                  ? 'font-semibold border-b-4 sm:border-b-0 sm:border-r-4 border-[#AB3130] opacity-100' 
                  : 'font-semibold opacity-50 hover:opacity-75'
              }`}
            >
              개인정보
            </button>
          </li>
        </ul>
      </div>

      <main className="flex-1 flex flex-col items-center justify-start pt-20 px-8 sm:items-start sm:ml-20">
        <div className="text-2xl font-semibold text-[#AB3130] mb-8 text-center sm:text-left">프로필 이미지</div>
        
        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {isLoading ? (
          <PrivacySkeleton />
        ) : (
          <>
            <div className="flex flex-row gap-10 items-center mb-13">
              <div className="relative w-32 h-32 mb-4">
                <div 
                  className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors relative overflow-hidden"
                  onClick={isEditing ? handleImageClick : undefined}
                  style={{ cursor: isEditing ? "pointer" : "default" }}
                >
                  {isProfileImageLoading ? (
                    <div className="w-full h-full object-cover rounded-full bg-gray-200 animate-pulse" />
                  ) : (
                    <img 
                      src={getDisplayImage()}
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  )}
                </div>
                {isEditing && (
                  <button
                    onClick={handleImageClick}
                    className="absolute bottom-2.5 right-0 w-8 h-8 bg-[#AB3130] rounded-full flex items-center justify-center hover:bg-[#8b2a25] transition-colors shadow-lg cursor-pointer"
                  >
                    <Pencil size={14} className="text-white" />
                  </button>
                )}
              </div>

              {isEditing && (
                <button
                  onClick={handleResetToDefault}
                  className="text-sm text-[#AB3130] border border-[#AB3130] px-4 py-1.5 rounded-full hover:bg-[#EFE8DC] transition-colors bg-transparent"
                >
                  기본 프로필 적용
                </button>
              )}
            </div>

            <div className="w-full max-w-2xl">
              <div className="grid grid-cols-2 gap-x-16 gap-y-6">
                {/* 이메일: 항상 읽기 전용 */}
                <div>
                  <label className="block text-[#AB3130] mb-2 font-semibold">이메일</label>
                  <input
                    type="text"
                    value={formData.email}
                    disabled
                    className="w-full max-w-[180px] sm:max-w-[300px] px-3 py-2 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] truncate cursor-not-allowed"
                    readOnly
                  />
                </div>
                
                {/* 닉네임 */}
                <div>
                  <label className="block text-[#AB3130] mb-2 font-semibold">닉네임</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.nickname}
                      onChange={(e) => handleInputChange("nickname", e.target.value)}
                      className="w-full max-w-[180px] sm:max-w-[300px] px-3 py-2 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-1 focus:ring-[#AB3130] truncate"
                    />
                  ) : (
                    <div className="w-full max-w-[180px] sm:max-w-[300px] px-3 py-2 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] truncate">
                      {formData.nickname}
                    </div>
                  )}
                </div>
                
                {/* 휴대폰 번호 */}
                <div>
                  <label className="block text-[#AB3130] mb-2 font-semibold">휴대폰 번호</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="w-full max-w-[180px] sm:max-w-[300px] px-3 py-2 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-1 focus:ring-[#AB3130] truncate"
                    />
                  ) : (
                    <div className="w-full max-w-[180px] sm:max-w-[300px] px-3 py-2 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] truncate">
                      {formData.phone}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-x-16 mt-12">
                {isLoading ? (
                  <>
                    <div className="w-full h-12 bg-gray-100 animate-pulse rounded-full" />
                    <div className="w-full h-12 bg-gray-100 animate-pulse rounded-full" />
                  </>
                ) : isEditing ? (
                  <>
                    <button
                      onClick={handleWithdrawClick}
                      className="cursor-pointer bg-transparent text-[#AB3130] border border-[#AB3130] px-4 py-3 rounded-full hover:bg-[#EFE8DC] transition-colors mt-5 mb-20"
                    >
                      회원 탈퇴하기
                    </button>
                    <button
                      onClick={handleSaveClick}
                      disabled={saving || isProfileImageLoading}
                      className="cursor-pointer bg-[#AB3130] text-white px-4 py-3 rounded-full hover:bg-[#8b2a25] transition-colors mt-5 mb-20 disabled:opacity-50"
                    >
                      {saving ? "저장 중..." : isProfileImageLoading ? "이미지 업로드 중..." : "수정 완료"}
                    </button>
                  </>
                ) : (
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={handleEditClick}
                      className="cursor-pointer bg-[#AB3130] text-white px-12 py-3 rounded-full hover:bg-[#8b2a25] transition-colors mt-5 mb-20"
                    >
                      회원정보 수정하기
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        
        {error && (
          <div className="text-sm text-red-500 mt-2">{error}</div>
        )}
      </main>
    </div>
  );
};

export default Privacy;
