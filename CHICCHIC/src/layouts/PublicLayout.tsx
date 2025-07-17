import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CommunityTabBar from "../components/Community/CommunityTabBar";

const PublicLayout = () => {
  const location = useLocation();
  // community page's navbar
  const isCommunityPage = location.pathname.startsWith("/community");

  return (
    <div className="bg-[#F7F4EF] min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
