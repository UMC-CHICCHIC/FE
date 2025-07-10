import { createBrowserRouter } from "react-router-dom";
import DiaryHome from "../pages/Community/PerfumeDiary/DiaryHome";
import NewDiary from "../pages/Community/PerfumeDiary/NewDiary";
import DiaryDetail from "../pages/Community/PerfumeDiary/DiaryDetail";
import PublicLayout from "../layouts/PublicLayout";

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
              { path: ":diaryId", element: <DiaryDetail /> }, // /community/diary/:diaryId
            ],
          },
        ],
      },
    ],
  },
]);
