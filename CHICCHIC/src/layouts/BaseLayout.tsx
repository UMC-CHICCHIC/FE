import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityTabBar from "../components/Community/CommunityTabBar";
import ScrollTop from "../components/ScrollTop";
import { useAuth } from "../hooks/useAuth";

interface BaseLayoutProps {
  protectedRoute?: boolean;
}

const BaseLayout = ({ protectedRoute = false }: BaseLayoutProps) => {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();
  const isCommunityPage = location.pathname.startsWith("/community");

  if (protectedRoute && loading) {
    // 서버 검증 중에는 리디렉션하지 않고 간단한 로딩 UI 표시
    return (
      <div className="bg-[#F7F4EF] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AB3130]" />
      </div>
    );
  }

  if (protectedRoute && !isLoggedIn) {
    // 로그인 안 되어 있으면 로그인 페이지로 리디렉션 (문자열 경로만 전달)
    const fromPath = `${location.pathname}${location.search ?? ""}`;
    return <Navigate to="/login" state={{ from: fromPath }} replace />;
  }

  return (
    <div className="bg-[#F7F4EF] min-h-screen flex flex-col">
      <ScrollTop />
      <Navbar />
      {isCommunityPage && <CommunityTabBar />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default BaseLayout;
