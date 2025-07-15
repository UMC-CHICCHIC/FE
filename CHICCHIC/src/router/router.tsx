import "../index.css";
import { createBrowserRouter } from "react-router-dom";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";
// import DiaryDetail from "../pages/Community/PerfumeDiary/DiaryDetail";
import PublicLayout from "../layouts/PublicLayout";
import ProductDetail from "../pages/Shopping/ProductDetail.tsx";
import ShoppingHome from "../pages/\bShopping/ShoppingHome.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
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
    ],
  },
]);
