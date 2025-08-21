import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { saveAuthTokens } from "../utils/authStorage";
import { getUserInfo } from "../apis/auth";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('로그인 처리 중...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const accessToken = urlParams.get('accessToken');
        const refreshToken = urlParams.get('refreshToken');

        if (!accessToken) {
          throw new Error('');
        }

        setMessage('로그인 정보 저장 중...');

        saveAuthTokens(accessToken, refreshToken || '', false);

        try {
          const userResponse = await getUserInfo();
          
          if (userResponse.data.isSuccess) {
            const userInfo = userResponse.data.result;
            login(userInfo);
          } else {
            login({ 
              email: "", 
              nickname: "사용자", 
              phoneNumber: "" 
            });
          }
        } catch (userError) {
          console.error("사용자 정보 조회 실패:", userError);
          login({ 
            email: "", 
            nickname: "사용자", 
            phoneNumber: "" 
          });
        }

        setStatus('success');
        setMessage('로그인 성공! 메인 페이지로 이동합니다...');
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1500);

      } catch (error: any) {
        console.error("OAuth 콜백 처리 실패:", error);
        
        setStatus('error');
        setMessage(error.message || '로그인 처리 중 오류가 발생했습니다.');
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 3000);
      }
    };

    handleOAuthCallback();
  }, [location, navigate, login]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F7F4EF]">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AB3130] mx-auto mb-4"></div>
            <h2 className="text-[#AB3130] text-xl font-medium mb-2">소셜 로그인</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <h2 className="text-[#AB3130] text-xl font-medium mb-2">로그인 성공!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'error' && (
          <>
            <h2 className="text-[#AB3130] text-xl font-medium mb-2">로그인 실패</h2>
            <p className="text-gray-600 mb-4">{message}</p>
            <button 
              onClick={() => navigate("/login")}
              className="px-4 py-2 bg-[#AB3130] text-white rounded-full hover:bg-[#8b2a25] transition-colors"
            >
              로그인 페이지로 돌아가기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default OAuthCallback;