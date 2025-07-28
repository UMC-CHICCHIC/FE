// src/components/Sidebar.tsx
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="fixed top-15 left-0 h-full w-64 bg-black text-white shadow-lg z-20">
      <nav className="mt-12 flex flex-col space-y-2 p-4">
        <NavLink to="/"      className="hover:bg-gray-800 px-2 py-1 rounded text-blue-500">홈</NavLink>
        <NavLink to="/login" className="hover:bg-gray-800 px-2 py-1 rounded text-blue-500">로그인</NavLink>
        <NavLink to="/signup"className="hover:bg-gray-800 px-2 py-1 rounded text-blue-500">회원가입</NavLink>
      </nav>
    </aside>
  );
}
