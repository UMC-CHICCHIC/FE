import { createBrowserRouter } from "react-router-dom";
import BrandHome from "../pages/Brand/BrandHome";
import CommunityHome from "../pages/Community/CommunityHome";
import ViewPost from "../pages/Community/ViewPost";
import Home from "../pages/Home";
import Login from "../pages/Login";
import MyDiaries from "../pages/Mypage/MyDiaries";
import MyScraps from "../pages/Mypage/MyScraps";
import Privacy from "../pages/Mypage/Privacy";
import Profile from "../pages/Mypage/Profile";
import NotFound from "../pages/NotFound";
import PersonalPerfumeList from "../pages/PersonalPerfume/PersonalPerfumeList";
import ScrapPage from "../pages/Scrap/ScrapPage";
import Signup from "../pages/Signup";
import RootLayout from "../layouts/PublicLayout";
import PrivacyPolicy from "../pages/footer/PrivacyPolicy";
import Terms from "../pages/footer/Terms";
import Contact from "../pages/footer/Contact";
import ShoppingHome from "../pages/Shopping/ShoppingHome";
import PersonalPerfumeTest from "../pages/PersonalPerfume/PersonalPerfumeTest";
import PersonalPerfumeResult from "../pages/PersonalPerfume/PersonalPerfumeResult";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "community",
        children: [
          { index: true, element: <CommunityHome /> }, // /community
          { path: "post/:id", element: <ViewPost /> }, // /community/post/:id
          {
            path: "diary",
            children: [
              { index: true, element: <DiaryHome /> }, // /community/diary
              { path: "new", element: <NewDiary /> }, // /community/diary/new
            ],
          },
        ],
      },
      
      {
        path: "shopping",
        children: [
          { index: true, element: <ShoppingHome /> }, // /shopping
        ],
      },

      // Brand
      { path: "brand", element: <BrandHome /> },

      // Footer Pages
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms />  },
      { path: "contact", element: <Contact />  },

      // Protected Routes - Personal Perfume Test
      { path: "personal-perfume", element: <PersonalPerfumeList /> },
      { path: "personal-perfume/test", element: <PersonalPerfumeTest /> },
      { path: "personal-perfume/result", element: <PersonalPerfumeResult /> },


      // Protected Routes - Scrap
      { path: "scrap", element: <ScrapPage /> },

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
]);

export default router;