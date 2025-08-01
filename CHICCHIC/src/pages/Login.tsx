import { useState } from "react";
import { useNavigate } from "react-router-dom";
import login from "../assets/images/login-image.png";
import google from "../assets/images/google-logo.png";
import kakao from "../assets/images/kakao-logo.png";
import naver from "../assets/images/naver-logo.png";
import { postLogin } from "../apis/auth";
import axios from "axios";
import { setAccessToken, setRefreshToken } from "../utils/authStorage";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await postLogin({
        username: formData.id,
        password: formData.password,
      });

      const { accessToken, refreshToken } = response.data;

      setAccessToken(accessToken);
      setRefreshToken(refreshToken);

      alert("로그인 성공!");
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("아이디 또는 비밀번호가 올바르지 않습니다.");
      } else {
        alert("로그인 중 오류가 발생했습니다.");
      }
      console.error("로그인 에러:", error);
    }
  };

  const handleSignup = () => {
    // 회원가입 페이지로 이동
    console.log("Navigate to signup");
    navigate("/signup");
  };

  const handleSocialLogin = (provider: string) => {
    // SNS 로그인 로직 (현재는 버튼 역할만)
    console.log(`${provider} login`);
  };

  const handleFindId = () => {
    // 아이디 찾기 로직
    console.log("Find ID");
  };

  const handleResetPassword = () => {
    // 비밀번호 재설정 로직
    console.log("Reset password");
  };

  return (
    <div className="font-pretendard flex min-h-screen bg-transparent text-[#AB3130] mb-30">
      <div className="flex justify-center flex-1 px-8 mt-30">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h1 className="text-[#AB3130] text-3xl font-normal mb-2">
              <span className="font-crimson">CHICCHIC</span>
              <span className="font-pretendard">에서</span>
            </h1>
            <h2 className="text-[#AB3130] text-3xl  font-normal">
              <span className="font-pretendard">나를 더 </span>
              <span className="font-crimson">CHIC</span>
              <span className="font-pretendard">하게.</span>
            </h2>
          </div>

          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="ID"
              value={formData.id}
              onChange={(e) => handleInputChange("id", e.target.value)}
              className="font-crimson w-full px-4 py-4 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] placeholder-[#AB3130] placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="font-crimson font-light w-full px-4 py-4 border border-[#AB3130] rounded-full bg-transparent text-[#AB3130] placeholder-[#AB3130] placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-[#AB3130]"
            />
          </div>

          <div className="flex items-center justify-between mb-8">
            <label className="flex items-center text-[#AB3130] text-sm">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 w-4 h-4 text-[#AB3130] bg-transparent border-2 border-[#AB3130] rounded-full focus:ring-[#AB3130] focus:ring-2 checked:bg-[#AB3130] checked:border-[#AB3130]"
              />
              로그인 상태 유지
            </label>
            <div className="flex space-x-2">
              <button
                onClick={handleFindId}
                className="text-[#AB3130] text-sm hover:underline"
              >
                아이디 찾기
              </button>
              <span className="text-[#AB3130] text-sm">|</span>
              <button
                onClick={handleResetPassword}
                className="text-[#AB3130] text-sm hover:underline"
              >
                비밀번호 재설정
              </button>
            </div>
          </div>

          <div className="mb-12 space-y-3">
            <button
              onClick={handleLogin}
              className="font-crimson w-full bg-[#AB3130] text-white py-4 rounded-full hover:bg-[#8b2a25] transition-colors font-normal cursor-pointer"
            >
              Log-in
            </button>
            <button
              onClick={handleSignup}
              className="font-crimson w-full bg-transparent font-normal text-[#AB3130] border border-[#AB3130] py-4 rounded-full hover:bg-[#E4E1DA] transition-colors cursor-pointer"
            >
              Sign-up
            </button>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-#AB3130"></div>
              <span className="px-4 text-[#AB3130] text-sm">
                SNS 계정으로 로그인
              </span>
              <div className="flex-1 border-t border-#AB3130"></div>
            </div>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => handleSocialLogin("naver")}
                className="flex items-center justify-center w-12 h-12 transition-opacity rounded-full cursor-pointer hover:opacity-80"
              >
                <img
                  src={naver}
                  alt="Naver Login"
                  className="w-full h-full rounded-full"
                />
              </button>
              <button
                onClick={() => handleSocialLogin("kakao")}
                className="flex items-center justify-center w-12 h-12 transition-opacity rounded-full cursor-pointer hover:opacity-80"
              >
                <img
                  src={kakao}
                  alt="Kakao Login"
                  className="w-full h-full rounded-full"
                />
              </button>
              <button
                onClick={() => handleSocialLogin("google")}
                className="flex items-center justify-center w-12 h-12 transition-opacity rounded-full cursor-pointer hover:opacity-80"
              >
                <img
                  src={google}
                  alt="Google Login"
                  className="w-full h-full rounded-full"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center flex-1 bg-gradient-to-br from-pink-50 to-purple-50">
        <div className="relative w-full h-full overflow-hidden">
          <img
            src={login}
            alt="Login background"
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
