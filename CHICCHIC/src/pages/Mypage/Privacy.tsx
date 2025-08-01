import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { getUserInfo } from "../../apis/auth";

const Privacy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    nickname: '',
    phone: '',
    email: '',
    id: '',
    password: '••••••'
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // 유저 정보 API 연동
  useEffect(() => {
    getUserInfo()
      .then((res) => {
        const user = res.data.result;
        setFormData({
          name: user.username || '',
          nickname: user.nickname || '',
          phone: user.phoneNumber || '',
          email: user.email || '',
          id: user.username || '',
          password: '••••••'
        });
      })
      .catch(() => {
        setFormData({
          name: '',
          nickname: '',
          phone: '',
          email: '',
          id: '',
          password: '••••••'
        });
      });
  }, []);

  const handleProfileClick = () => {
    navigate('/mypage');
  };

  const handlePrivacyClick = () => {
    navigate('/mypage/privacy');
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  const handleWithdrawClick = () => {
    // 회원 탈퇴 버튼 클릭 - 로직 없이 버튼 역할만
    alert('회원 탈퇴 성공');
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById('profile-image-input') as HTMLInputElement;
    fileInput?.click();
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
              style={{ borderRight: currentPath === '/mypage/privacy' && window.innerWidth >= 640 ? '4px solid #AB3130' : undefined }}
            >
              개인정보
            </button>
          </li>
        </ul>
      </div>

      {/* 내용 영역 */}
      <main className="flex-1 flex flex-col items-center justify-start pt-16 px-8 sm:items-start sm:ml-20">
        <div className="text-2xl font-semibold text-[#AB3130] mb-8 text-center sm:text-left">프로필 이미지</div>
        
        <div className="relative w-32 h-32 mb-20">
          <div 
            className="w-32 h-32 rounded-full bg-gray-400 flex items-center justify-center cursor-pointer hover:bg-gray-500 transition-colors relative overflow-hidden"
            onClick={handleImageClick}
          >
            {profileImage ? (
              <img 
                src={profileImage} 
                alt="Profile" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
          
          <button
            onClick={handleImageClick}
            className="absolute bottom-2.5 right-0 w-8 h-8 bg-[#AB3130] rounded-full flex items-center justify-center hover:bg-[#8b2a25] transition-colors shadow-lg"
          >
            <Pencil size={14} className="text-white" />
          </button>
        </div>
        
        <input
          type="file"
          id="profile-image-input"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />

        {/* 개인정보 수정 */}
        <div className="w-full max-w-2xl">
          <div className="grid grid-cols-2 gap-x-16 gap-y-6">
            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">성명</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
                />
              ) : (
                <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                  {formData.name}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">닉네임</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
                />
              ) : (
                <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                  {formData.nickname}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">휴대폰 번호</label>
              {isEditing ? (
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
                />
              ) : (
                <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                  {formData.phone}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">이메일</label>
              {isEditing ? (
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
                />
              ) : (
                <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                  {formData.email}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">아이디</label>
              <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                {formData.id}
              </div>
            </div>

            <div>
              <label className="block text-[#AB3130] mb-2 font-semibold">비밀번호</label>
              <div className="w-full px-4 py-3 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130]">
                {formData.password}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-16 mt-12">
            {isEditing ? (
              <>
                <button
                  onClick={handleWithdrawClick}
                  className="cursor-pointer bg-transparent text-[#AB3130] border border-[#AB3130] px-4 py-3 rounded-full hover:bg-gray-50 transition-colors mt-10 mb-15"
                >
                  회원 탈퇴하기
                </button>
                <button
                  onClick={handleSaveClick}
                  className="cursor-pointer bg-[#AB3130] text-white px-4 py-3 rounded-full hover:bg-[#8b2a25] transition-colors mt-10 mb-15"
                >
                  수정 완료
                </button>
              </>
            ) : (
              <div className="col-span-2 flex justify-center">
                <button
                  onClick={handleEditClick}
                  className="cursor-pointer bg-[#AB3130] text-white px-12 py-3 rounded-full hover:bg-[#8b2a25] transition-colors mt-10 mb-15"
                >
                  회원정보 수정하기
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;