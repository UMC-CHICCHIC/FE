// src/pages/OAuthCallback.tsx
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "axios";
import { saveAuthTokens } from "../utils/authStorage";
import { useAuth } from "../hooks/useAuth";
import { getUserInfo } from "../apis/auth";

const API_BASE = import.meta.env.VITE_SERVER_API_URL; // 예: https://chicchic-perfume.com

export default function OAuthCallback() {
  const navigate = useNavigate();
  const { provider } = useParams(); // 'google' | 'kakao' | 'naver'
  const [qs] = useSearchParams();
  const { login } = useAuth();

  useEffect(() => {
    const code = qs.get("code");
    const state = qs.get("state");

    if (!provider || !code) {
      navigate("/login");
      return;
    }

    (async () => {
      try {
        // 1) 백엔드 콜백 엔드포인트로 axios 요청
        //    Spring Security가 처리하는 기본 콜백 경로를 그대로 사용
        const url = `${API_BASE}/login/oauth2/code/${provider}`;
        const res = await axios.get(url, {
          params: { code, state },         // /login/oauth2/code/{provider}?code=...&state=...
          withCredentials: true,           // (필요 시) 쿠키 사용
        });

        // 2) 토큰 파싱 (서버 키가 accesstoken / refreshToken 형태인 점 주의)
        const data = res.data || {};
        const accessToken = data.accessToken || data.accesstoken;
        const refreshToken = data.refreshToken || data.refresh_token;

        if (!accessToken || !refreshToken) {
          throw new Error("토큰이 응답에 없습니다.");
        }

        // 3) 토큰 저장 (rememberMe는 필요에 따라 true/false)
        saveAuthTokens(accessToken, refreshToken, true);

        // 4) 사용자 정보 조회 → 전역 로그인
        const me = await getUserInfo();
        const user = me?.data?.result;
        if (user) {
          login(user);
        }

        // 5) 완료 후 이동
        navigate("/");
      } catch (err) {
        console.error("OAuth 콜백 처리 실패:", err);
        navigate("/login?social=fail");
      }
    })();
  }, [provider, qs, navigate, login]);

  return <p>로그인 처리 중...</p>;
}