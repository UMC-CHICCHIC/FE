import { Outlet } from "react-router-dom";
import { Header } from "./Header"; // Header 컴포넌트 import

const PublicLayout = () => {
  return (
    <div>
      <Header /> {/* 헤더 추가 */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;
