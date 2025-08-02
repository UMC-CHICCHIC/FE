import { useNavigate } from "react-router-dom";
import { clearAuthTokens } from "./authStorage";

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    clearAuthTokens();      // 로컬스토리지 토큰 삭제
    // zustand 전역 상태 초기화 추가해야 됨
    navigate("/login");
  };

  return logout;
};