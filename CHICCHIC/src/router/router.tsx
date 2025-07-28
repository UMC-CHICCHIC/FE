import "../index.css";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome.tsx";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary.tsx";
import PublicLayout from "../layouts/PublicLayout.tsx";
import ProductDetail from "../pages/Shopping/ProductDetail.tsx";
import ShoppingHome from "../pages/Shopping/ShoppingHome.tsx";
import NotFound from "../pages/NotFound.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Signup from "../pages/SignUp.tsx";
import PrivacyPolicy from "../pages/Footer/PrivacyPolicy.tsx";
import Terms from "../pages/Footer/Terms.tsx";
import Contact from "../pages/Footer/contact.tsx";
import ProtectedLayout from "../layouts/ProtectedLayout.tsx";
import Profile from "../pages/Mypage/Profile.tsx";
import Privacy from "../pages/Mypage/Privacy.tsx";
import MyScraps from "../pages/Mypage/MyScraps.tsx";
import MyDiaries from "../pages/Mypage/MyDiaries.tsx";
import Test from "../pages/PersonalPerfume/Test.tsx";
import PopularProductsList from "../pages/PopularProducts/PopularProductsList.tsx";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "community",
        children: [
          {
            path: "diary",
            children: [
              { index: true, element: <DiaryHome /> }, // /community/diary
              { path: "new", element: <NewDiary /> }, // /community/diary/new
              // { path: ":diaryId", element: <DiaryDetail /> }, // /community/diary/:diaryId
            ],
          },
        ],
      },
      {
        path: "shopping",
        children: [
          { index: true, element: <ShoppingHome /> }, // /shopping
          { path: ":productId", element: <ProductDetail /> }, // /shopping/:productId
        ],
      },
      {
        path: "personal-perfume",
        children: [
          { path: "test", element: <Test /> }, // /personal-perfume/test
        ],
      },
      {
        path: "PopularProductsList",
        element: <PopularProductsList />,
      },

      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
    {
      element: <ProtectedLayout />,
      children: [
        {
        path: "mypage",
        children: [
          { index: true, element: <Profile /> }, // /mypage
          { path: "privacy", element: <Privacy /> }, // /mypage/privacy
          { path: "scraps", element: <MyScraps /> }, // /mypage/scraps
          { path: "diaries", element: <MyDiaries /> }, // /mypage/diaries
        ],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default router;
