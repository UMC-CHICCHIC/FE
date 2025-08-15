import { useNavigate } from "react-router-dom";
import { clearAuthTokens } from "./authStorage";
import { useAuthStore } from "../store/useAuthStore";
import { deleteLogout } from "../apis/auth";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: storeLogout } = useAuthStore();

  const logout = async () => {
    try {
      const response = await deleteLogout();
      
      if (response.data.isSuccess) {
        console.log("서버 로그아웃 성공:", response.data.message);
      } else {
        console.error("서버 로그아웃 실패:", response.data.message);
      }
    } catch (error) {
      console.error("로그아웃 API 에러:", error);
      // 서버 에러가 발생해도 클라이언트 로그아웃은 진행
    } finally {
      clearAuthTokens(); 
      storeLogout();
      navigate("/login");
    }
  };

  return logout;
};