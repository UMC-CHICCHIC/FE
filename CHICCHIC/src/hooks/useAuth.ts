import { useEffect, useState } from "react";
import { getUserInfo } from "../apis/auth";
import { clearAuthTokens } from "../utils/authStorage";

export function useAuth() {
  // 로컬 토큰 기반 즉시 판단
  const [isLoggedIn, setIsLoggedIn] = useState(
    Boolean(localStorage.getItem("accessToken"))
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const verify = async () => {
      setLoading(true);
      const hasToken = Boolean(localStorage.getItem("accessToken"));
      if (!hasToken) {
        if (mounted) {
          setIsLoggedIn(false);
          setLoading(false);
        }
        return;
      }
      try {
        const { data } = await getUserInfo();
        const ok = Boolean(data?.isSuccess && data?.result);
        if (mounted) setIsLoggedIn(ok);
        if (!ok) clearAuthTokens();
      } catch {
        if (mounted) setIsLoggedIn(false);
        clearAuthTokens();
      } finally {
        if (mounted) setLoading(false);
      }
    };

    void verify();

    // 다른 탭/창에서 로그인 상태가 바뀌었을 때 반영
    const onStorage = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        setIsLoggedIn(Boolean(localStorage.getItem("accessToken")));
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      mounted = false;
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  return { isLoggedIn, loading };
}