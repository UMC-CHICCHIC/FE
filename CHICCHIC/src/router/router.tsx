// router.tsx

import { createBrowserRouter, type RouteObject } from "react-router-dom";
import ProtectedLayout from "../layouts/ProtectedLayout";
import BrandHome from "../pages/Brand/BrandHome";
import AwaitingAnswerPosts from "../pages/Community/AwaitingAnswerPosts";
import CommunityHome from "../pages/Community/CommunityHome";
import PerfumeCounselingHome from "../pages/Community/PerfumeCounselingHome";
import DiaryDetail from "../pages/Community/PerfumeDiary/DiaryDetail";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";
import RecentCounselingPosts from "../pages/Community/RecentCounselingPosts";
import ViewPost from "../pages/Community/ViewPost";
import Home from "../pages/Home";
import Login from "../pages/Login";
import EditPrivacy from "../pages/Mypage/EditPrivacy";
import MyDiaries from "../pages/Mypage/MyDiaries";
import MyHome from "../pages/Mypage/MyHome";
import MyScraps from "../pages/Mypage/MyScraps";
import Privacy from "../pages/Mypage/Privacy";
import Profile from "../pages/Mypage/Profile";
import Notify from "../pages/Mypage/Notification";
import NotFound from "../pages/NotFound";
import PerfumeStoryDetail from "../pages/PerfumeStory/PerfumeStoryDetail";
import PerfumeStoryList from "../pages/PerfumeStory/PerfumeStoryList";
import PerfumeStoryPost from "../pages/PerfumeStory/PerfumeStoryPost";
import PersonalPerfumeList from "../pages/PersonalPerfume/PersonalPerfumeList";
import PersonalPerfumeResult from "../pages/PersonalPerfume/PersonalPerfumeResult";
import PersonalPerfumeTest from "../pages/PersonalPerfume/PersonalPerfumeTest";
import PopularProductsList from "../pages/PopularProducts/PopularProductsList";
import PopularProductsDetail from "../pages/PopularProducts/PopularProductsDetail";
import ProductsDetail from "../pages/PopularProducts/ProductsDetail";
import ScrapPage from "../pages/Scrap/ScrapPage";
import Signup from "../pages/Signup";
import RootLayout from "../layouts/PublicLayout";
import PrivacyPolicy from "../pages/footer/PrivacyPolicy";
import Terms from "../pages/footer/Terms";
import Contact from "../pages/footer/Contact";

// Public Routes
const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // Shopping
      { path: "popular-products", element: <PopularProductsList /> },
      { path: "popular-products/:id", element: <PopularProductsDetail /> },
      { path: "product/:id", element: <ProductsDetail /> },

      // Perfume Story
      { path: "perfume-story", element: <PerfumeStoryList /> },
      { path: "perfume-story/:id", element: <PerfumeStoryDetail /> },

      // Community
      { path: "community", element: <CommunityHome /> },
      { path: "community/post/:id", element: <ViewPost /> },
      { path: "perfume-counseling", element: <PerfumeCounselingHome /> },
      { path: "perfume-counseling/recent", element: <RecentCounselingPosts /> },
      { path: "perfume-counseling/awaiting", element: <AwaitingAnswerPosts /> },
      { path: "perfume-diary", element: <DiaryHome /> },
      { path: "perfume-diary/:id", element: <DiaryDetail /> },

      // Brand
      { path: "brand", element: <BrandHome /> },

      // Footer Pages
      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms />  },
      { path: "contact", element: <Contact />  },
	  ],
  },
];

// Protected Routes
const protectedRoutes: RouteObject[] = [
    {
      element: <ProtectedLayout />,
      children: [
        // Personal Perfume Test
        { path: "personal-perfume", element: <PersonalPerfumeList /> },
        { path: "personal-perfume/test", element: <PersonalPerfumeTest /> },
        { path: "personal-perfume/result", element: <PersonalPerfumeResult /> },

        // Perfume Story Post
        { path: "perfume-story/new", element: <PerfumeStoryPost /> },

        // Diary 작성
        { path: "perfume-diary/new", element: <NewDiary /> },

        // Scrap
        { path: "scrap", element: <ScrapPage /> },

        // MyPage
        { path: "mypage", element: <MyHome /> },
        { path: "mypage/profile", element: <Profile /> },
        { path: "mypage/notifications", element: <Notify /> },
        { path: "mypage/privacy", element: <Privacy /> },
        { path: "mypage/privacy/edit", element: <EditPrivacy /> },
        { path: "mypage/scraps", element: <MyScraps /> },
        { path: "mypage/diaries", element: <MyDiaries /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default router;