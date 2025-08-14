import { useGetProductReview } from "../../hooks/queries/useGetProduct";
import kebab from "../../assets/icons/kebab.svg";
import { GetStarRating } from "./getStarRating";
import type { ProductReview, Rating } from "../../types/perfumes";
import { ReivewTimeFormat } from "../../utils/dateTimeFormat";
import { useState } from "react";
import { Pagination } from "../Pagination";

interface ReviewListProps {
  perfumeId: number;
  page: number;
  size: number;
}

// mock
const mockComments: ProductReview[] = [
  {
    id: 1,
    memberNickname: "향덕후",
    rating: 3.5,
    content: "저도 이 향수 정말 좋아해요! 특히 봄에 잘 어울려요",
    createdAt: "2025-08-10T14:23:00Z",
  },
  {
    id: 2,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 3,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 4,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 5,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 6,
    memberNickname: "향덕후",
    rating: 3.5,
    content: "저도 이 향수 정말 좋아해요! 특히 봄에 잘 어울려요",
    createdAt: "2025-08-10T14:23:00Z",
  },
  {
    id: 7,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 8,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 9,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 10,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 11,
    memberNickname: "향덕후",
    rating: 3.5,
    content: "저도 이 향수 정말 좋아해요! 특히 봄에 잘 어울려요",
    createdAt: "2025-08-10T14:23:00Z",
  },
  {
    id: 12,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 13,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 14,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
  {
    id: 15,
    memberNickname: "퍼퓸러버",
    rating: 4.5,
    content: "향이 오래 가는 편인가요?",
    createdAt: "2025-08-10T15:01:00Z",
  },
];

export const ReviewList = ({ perfumeId, page, size }: ReviewListProps) => {
  const {
    data = [],
    // isError,
    // isLoading,
    // error,
  } = useGetProductReview(perfumeId, page, size);

  const [presentPage, setPresentPage] = useState(1);
  const hasNext = data?.length === size;

  // if (isError)
  //   return (
  //     <p className="text-center text-red-600 text-md">
  //       리뷰 로딩 실패: {error.message}
  //     </p>
  //   );
  // if (isLoading) {
  //   return (
  //     <ul className="space-y-3">
  //       {Array.from({ length: size }).map((_, i) => (
  //         <li
  //           key={i}
  //           className="h-40 p-8 border border-[#AB3130] rounded-lg animate-pulse"
  //         />
  //       ))}
  //     </ul>
  //   );
  // }
  return (
    <div className="flex flex-col m-4 gap-6 items-center font-[pretendard]">
      {/* data.map으로 변경예정 */}
      {mockComments.map((review) => (
        <div
          key={review.id}
          className="flex flex-col mx-auto w-full border-b border-[#AB3130] pb-4 mb-6"
        >
          {/* 별점 + 날짜 + 메뉴 */}
          <div className="flex items-start justify-between">
            <div className="flex-col space-y-4">
              <GetStarRating value={review.rating as Rating} />
              {/* 닉네임 */}
              <span className="mt-2 font-medium text-3xl text-[#AB3130]">
                {review.memberNickname}
              </span>
              {/* 리뷰 내용 */}
              {review.content && (
                <p className="mt-2 text-[#AB3130] text-xl font-light py-4 whitespace-pre-line break-words">
                  {review.content}
                </p>
              )}
            </div>
            <div className="flex flex-col w-40 items-end gap-4 text-[#AB3130]">
              <span className="text-sm sm:text-[20px] font-light">
                {ReivewTimeFormat(review.createdAt)}
              </span>
              <button className="flex flex-col items-center justify-center">
                <img
                  src={kebab}
                  alt="kebab"
                  className="w-2"
                  onClick={() => null}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* 페이지네이션 */}
      <Pagination
        page={presentPage}
        hasNext={hasNext}
        onChange={(newPage) => setPresentPage(newPage)}
        windowSize={5}
        // isLoading={isLoading}
      />
    </div>
  );
};
