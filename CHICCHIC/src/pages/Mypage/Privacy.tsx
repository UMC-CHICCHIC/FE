import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";

const Privacy = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '성명',
    nickname: '닉네임',
    phone: '010-1234-5678',
    email: 'asdfgh@gmail.com',
    id: 'asdfgh',
    password: '••••••' //비밀번호 *로 표시 -> 수정할 때 보이기
  });
  const [profileImage, setProfileImage] = useState<string | null>(null);

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
    <div className="font-pretendard flex min-h-[calc(100vh-64px)] bg-transparent text-[#a8342f]">
      {/* 사이드 탭 */}
      <div className="w-97 border-r border-[#AB3130] pt-20 flex flex-col">
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
                  ? 'font-bold border-r-4 border-[#AB3130] opacity-100 py-2 ' 
                  : 'opacity-50 hover:opacity-75'
              }`}
            >
              개인정보
            </button>
          </li>
        </ul>
      </div>

      <main className="flex-1 flex flex-col items-start justify-start pt-16 px-8 ml-20">

        <div className="text-2xl font-semibold text-[#AB3130] mb-8">프로필 이미지</div>
        
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