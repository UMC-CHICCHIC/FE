import { NavLink } from "react-router-dom";

export default function CommunityTabBar() {
  return (
    <nav className="bg-white text-sm border-b border-[#AB3130] sticky top-[88px] z-40">
      <ul className="flex justify-around items-center text-[#606472] py-3 space-x-8 font-[pretendard] font-light text-lg ">
        <li>
          <NavLink
            to="/community"
            end
            className={({ isActive }) =>
              isActive ? "text-[#66191F] font-medium" : ""
            }
          >
            커뮤니티 홈
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/community/recommendation"
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
