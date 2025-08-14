import { Outlet, useLocation, Navigate } from "react-router-dom";
import { memo, useMemo, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityTabBar from "../components/Community/CommunityTabBar";
import ScrollTop from "../components/ScrollTop";
import { useAuth } from "../hooks/useAuth";
import LoadingSkeleton from "../components/skeletons/LayoutSkeleton";

interface BaseLayoutProps {
  protectedRoute?: boolean;
}

const BaseLayout = memo(({ protectedRoute = false }: BaseLayoutProps) => {
  const { isLoggedIn, isRefreshing } = useAuth();
  const location = useLocation();

  const isCommunityPage = useMemo(
    () => location.pathname.startsWith("/community"),
    [location.pathname]
  );

  const authGuard = useMemo(() => {
    if (!protectedRoute) return null;

    if (isRefreshing) {
      return <LoadingSkeleton />;
    }

    if (!isLoggedIn) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return null;
  }, [protectedRoute, isRefreshing, isLoggedIn, location]);

  if (authGuard) return authGuard;

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
});

BaseLayout.displayName = "BaseLayout";

export default BaseLayout;
