import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../week5/context/AuthContext";

export const Navbar = ({onClose}:{onClose: ()=> void }) => {
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();    // 함수 호출로 바꿔야 합니다
    navigate("/");
  };

  return (
    <nav className="bg-black p-4 fixed w-full top-0 left-0 z-10 flex items-center justify-between">
      <div className="flex items-center space-x-6">
      <button
        onClick={onClose}
        className=" right-2 top-2 text-blue-500 text-xl hover:scale-120 transition cursor-pointer"
      >⁝</button>
      <Link to="/" className="text-blue-500 text-lg font-bold hover:scale-120 transition">
        돌려돌려LP판
      </Link>
      </div>

      {accessToken ? (
        // 로그인 상태일 때: 마이페이지 & 로그아웃
        <div className="flex items-center space-x-4">
          <Link to="/my" className="text-blue-500">
            마이페이지
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-300 text-white py-1 px-3 rounded hover:scale-90 transition"
          >
            로그아웃
          </button>
        </div>
      ) : (
        // 비로그인 상태일 때: 로그인 & 회원가입
        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-blue-500">
            로그인
          </Link>
          <Link to="/signup" className="text-blue-500">
            회원가입
          </Link>
        </div>
      )}
    </nav>
  );
};
