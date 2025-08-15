import "../styles/index.css";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";
import BaseLayout from "../layouts/BaseLayout";
import ProductDetail from "../pages/Shopping/ProductDetail.tsx";
import ShoppingHome from "../pages/Shopping/ShoppingHome.tsx";
import NotFound from "../pages/NotFound.tsx";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Signup from "../pages/SignUp.tsx";
import PrivacyPolicy from "../pages/Footer/PrivacyPolicy.tsx";
import Terms from "../pages/Footer/Terms.tsx";
import Contact from "../pages/Footer/contact.tsx";
import Profile from "../pages/Mypage/Profile.tsx";
import Privacy from "../pages/Mypage/Privacy.tsx";
import MyScraps from "../pages/Mypage/MyScraps.tsx";
import Test from "../pages/PersonalPerfume/Test.tsx";
import CommunityHome from "../pages/Community/CommunityHome.tsx";
import CounselingHome from "../pages/Community/PerfumeCounseling/CounselingHome.tsx";
import NewCounseling from "../pages/Community/PerfumeCounseling/NewCounseling.tsx";
import CounselingDetail from "../pages/Community/PerfumeCounseling/CounselingDetail.tsx";
import CounselingLists from "../pages/Community/PerfumeCounseling/CounselingLists.tsx";
import PerfumeStory from "../pages/Community/PerfumeStory/PerfumeStory.tsx";
import PerfumeStoryEgypt from "../pages/Community/PerfumeStory/PerfumeStoryEgypt.tsx";
import PerfumeStoryVase from "../pages/Community/PerfumeStory/PerfumeStoryVase.tsx";
import PerfumeStoryLongevity from "../pages/Community/PerfumeStory/PerfumeStoryLongevity.tsx";
import PerfumeStoryNote from "../pages/Community/PerfumeStory/PerfumeStoryNote.tsx";
import MyDiaryList from "../pages/Community/PerfumeDiary/MyDiaryList.tsx";
import PublicDiaryList from "../pages/Community/PerfumeDiary/PublicDiaryList.tsx";
import DiaryDetail from "../pages/Community/PerfumeDiary/DiaryDetail.tsx";
import PopularPerfumeId from "../pages/PopularPerfume/PopularPerfumeId";
import Brand from "../pages/Brand/Brand";

const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <BaseLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "community",
        children: [
          { index: true, element: <CommunityHome /> },
          {
            path: "recommendation",
            children: [
              { index: true, element: <CounselingHome /> },
              {
                path: "list",
                children: [
                  { index: true, element: <CounselingLists /> },
                  { path: ":consultPostId", element: <CounselingDetail /> },
                ],
              },
            ],
          },
          {
            path: "diary",
            children: [
              { index: true, element: <DiaryHome /> }, // /community/diary
              { path: "new", element: <NewDiary /> }, // /community/diary/new
              { path: "my-diary", element: <MyDiaryList /> }, // /community/diary/my-diary
              {
                path: "public-diary",
                children: [
                  {
                    index: true,
                    element: <PublicDiaryList />,
                  },
                  {
                    path: ":postId",
                    element: <DiaryDetail />,
                  },
                ],
              }, // /community/diary/public-diary
            ],
          },
          {
            path: "story",
            children: [
              { index: true, element: <PerfumeStory /> },
              { path: "ancient-egypt", element: <PerfumeStoryEgypt /> },
              { path: "perfume-vs-eau", element: <PerfumeStoryVase /> },
              { path: "perfume-longevity", element: <PerfumeStoryLongevity /> },
              { path: "perfume-notes", element: <PerfumeStoryNote /> },
            ],
          },
        ],
      },
      {
        path: "shopping",
        children: [
          { index: true, element: <ShoppingHome /> }, // /shopping
          { path: ":perfumeId", element: <ProductDetail /> }, // /shopping/:productId
        ],
      },

      {
        path: "personal-perfume",
        children: [
          { path: "test", element: <Test /> }, // /personal-perfume/test
        ],
      },

      {
        path: "PopularPerfumeId",
        element: <PopularPerfumeId />,
      },

  { path: "brand", element: <Brand /> },

      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms /> },
      { path: "contact", element: <Contact /> },
    ],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    element: <BaseLayout protectedRoute={true} />,
    children: [
      {
        path: "mypage",
        children: [
          { index: true, element: <Profile /> },
          { path: "privacy", element: <Privacy /> },
          { path: "scraps", element: <MyScraps /> },
        ],
      },
      {
        path: "recommendation",
        children: [{ path: "new", element: <NewCounseling /> }],
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);

export default router;
