import { NavLink } from "react-router-dom";

export default function CommunityTabBar() {
  return (
    <nav className="bg-white text-sm font-semibold border-b sticky top-[64px] z-10">
      <ul className="flex justify-around items-center py-3 space-x-8 font-[pretendard] font-extralight text-lg">
        <li>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive ? "text-[#66191F] font-medium" : ""
            }
          >
            커뮤니티 홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community/counseling"
            className={({ isActive }) =>
              isActive ? "text-[#66191F] font-medium" : ""
            }
          >
            향수 추천 상담소
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community/story"
            className={({ isActive }) =>
              isActive ? "text-[#66191F] font-medium" : ""
            }
          >
            향수 이야기
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community/diary"
            className={({ isActive }) =>
              isActive ? "text-[#66191F] font-medium" : ""
            }
          >
            향수 일기장
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
