export function useAuth() {
  const isLoggedIn = Boolean(localStorage.getItem("accessToken"));
  return { isLoggedIn };
} // 전역 상태 관리 추가