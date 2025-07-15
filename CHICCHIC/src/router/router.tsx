import "../index.css";
import { createBrowserRouter } from "react-router-dom";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";
// import DiaryDetail from "../pages/Community/PerfumeDiary/DiaryDetail";
import PublicLayout from "../layouts/PublicLayout";
import ProductDetail from "../pages/Shopping/ProductDetail.tsx";
import ShoppingHome from "../pages/Shopping/ShoppingHome.tsx";
import NotFound  from "../pages/NotFound.tsx"
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import Signup from "../pages/SignUp.tsx";
import PrivacyPolicy from "../pages/Footer/PrivacyPolicy.tsx";
import Terms from "../pages/Footer/Terms.tsx";
import Contact from "../pages/Footer/contact.tsx";

export const router = createBrowserRouter([
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

      { path: "privacy-policy", element: <PrivacyPolicy /> },
      { path: "terms", element: <Terms />  },
      { path: "contact", element: <Contact />  },

    ],
  },
]);
