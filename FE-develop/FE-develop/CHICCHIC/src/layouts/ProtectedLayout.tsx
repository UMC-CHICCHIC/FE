import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityTabBar from "../components/Community/CommunityTabBar";
import ScrollTop from "../components/ScrollTop";

const ProtectedLayout = () => {
  const location = useLocation();
  // community page's navbar
  const isCommunityPage = location.pathname.startsWith("/community");

  // 인증 상태 확인 로직 추가
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
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

export default ProtectedLayout;
