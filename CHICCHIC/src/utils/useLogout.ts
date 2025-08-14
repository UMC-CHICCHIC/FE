import { useNavigate } from "react-router-dom";
import { clearAuthTokens } from "./authStorage";
import { useAuthStore } from "../store/useAuthStore";

export const useLogout = () => {
  const navigate = useNavigate();
  const { logout: storeLogout } = useAuthStore();

  const logout = () => {
    clearAuthTokens(); 
    storeLogout();
    navigate("/");
  };

  return logout;
};