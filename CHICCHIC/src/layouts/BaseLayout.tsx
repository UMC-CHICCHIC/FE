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
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  const isCommunityPage = location.pathname.startsWith("/community");

  if (protectedRoute && !isLoggedIn) {
    // 로그인 안 되어 있으면 로그인 페이지로 리디렉션
    return <Navigate to="/login" state={{ from: location }} replace />;
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
