import { Outlet, useLocation, Navigate } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityTabBar from "../components/Community/CommunityTabBar";
import ScrollTop from "../components/ScrollTop";
import { useAuth } from "../hooks/useAuth";
import LoadingSkeleton from "../components/skeletons/LayoutSkeleton";

interface BaseLayoutProps {
  protectedRoute?: boolean;
}

const BaseLayout = ({ protectedRoute = false }: BaseLayoutProps) => {
  const { isLoggedIn, isRefreshing, isInitialized } = useAuth();
  const location = useLocation();

  const isCommunityPage = location.pathname.startsWith("/community");

  // 토큰 검증/갱신 중 간단한 스피너 로딩
  if (protectedRoute && (!isInitialized || isRefreshing)) {
    return (
      <div className="bg-[#F7F4EF] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#AB3130]" />
      </div>
    );
  }

  if (protectedRoute && !isLoggedIn) {
    const fromPath = `${location.pathname}${location.search ?? ""}`;
    return <Navigate to="/login" state={{ from: fromPath }} replace />;
  }

  return (
    <div className="bg-[#F7F4EF] min-h-screen flex flex-col">
      <ScrollTop />
      <Navbar />
      {isCommunityPage && <CommunityTabBar />}
      <main className="flex-1">
        <Suspense fallback={<LoadingSkeleton />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

BaseLayout.displayName = "BaseLayout";

export default BaseLayout;
