// components/Review/ReviewList.tsx
import { useEffect, useState } from "react";
import { useGetProductReview } from "../../hooks/queries/useGetProduct";
import kebab from "../../assets/icons/kebab.svg";
import { GetStarRating } from "./getStarRating";
import type { ProductReview, Rating } from "../../types/perfumes";
import { ReviewTimeFormat } from "../../utils/dateTimeFormat";
import { Pagination } from "../Pagination";
import { ReviewEdit } from "./ReviewEdit";
import { useAuth } from "../../hooks/useAuth";
import { ReviewEditForm } from "./ReviewEditForm";

interface ReviewListProps {
  perfumeId: number;
  size: number;
}

export const ReviewList = ({ perfumeId, size }: ReviewListProps) => {
  const [presentPage, setPresentPage] = useState(1);
  const [reviewEdit, setReviewEdit] = useState<number | null>(null);
  const [editTarget, setEditTarget] = useState<{
    id: number;
    content: string;
    rating: Rating;
  } | null>(null);
  const { isLoggedIn, user } = useAuth() as {
    isLoggedIn: boolean;
    user?: { memberId?: number; nickname?: string };
  };

  // 리뷰 수정 토글
  const handleReviewEdit = (review: ProductReview) => {
    if (!isLoggedIn) {
      alert("로그인이 필요한 서비스 입니다.");
      return;
    }
    // 리뷰 편집 닉네임 비교
    const isOwner = user?.nickname && review?.memberNickname === user?.nickname;

    if (user && !isOwner) {
      alert("본인 리뷰만 수정 가능합니다");
      return;
    }
    setReviewEdit((prev) => (prev === review.id ? null : review.id));
  };

  // 리뷰 수정 폼
  const openEditForm = (review: ProductReview) => {
    setEditTarget({
      id: review.id,
      content: review.content ?? "",
      rating: (review.rating as Rating) ?? 0,
    });
    setReviewEdit(null); // 메뉴 닫기
  };

  // 수정 폼 닫기
  const closeEditForm = () => setEditTarget(null);

  useEffect(() => {
    setPresentPage(1);
  }, [perfumeId]);

  const {
    data = [],
    isLoading,
    isError,
    error,
  } = useGetProductReview(perfumeId, presentPage, (size = 3));

  const hasNext = data.length === size;

  if (isError) {
    return (
      <p className="text-center text-red-600 text-md">
        리뷰 로딩 실패: {String(error)}
      </p>
    );
  }

  return (
    <div className="flex flex-col m-4 gap-6 items-center font-[pretendard]">
      {isLoading && (
        <ul className="w-full space-y-3">
          {Array.from({ length: size }).map((_, i) => (
            <li
              key={i}
              className="h-40 p-8 border border-[#AB3130] rounded-lg animate-pulse"
            />
          ))}
        </ul>
      )}
      {!isLoading && data.length === 0 && (
        <p className="text-[#AB3130]">아직 리뷰가 없습니다.</p>
      )}
      {!isLoading &&
        data.map((review) => (
          <div
            key={review.id}
            className="flex flex-col mx-auto w-full border-b border-[#AB3130] pb-4 mb-6"
          >
            <div className="flex items-start justify-between">
              <div className="flex-col space-y-4">
                <GetStarRating value={review.rating as Rating} />
                <span className="mt-2 font-medium text-3xl text-[#AB3130]">
                  {review.memberNickname}
                </span>
                {review.content && (
                  <p className="mt-2 text-[#AB3130] text-xl font-light py-4 whitespace-pre-line break-words">
                    {review.content}
                  </p>
                )}
              </div>
              <div className="flex flex-col w-40 items-end gap-4 text-[#AB3130] relative">
                <span className="text-sm sm:text-[20px] font-light">
                  {ReviewTimeFormat(review.createdAt)}
                </span>
                <div className="z-10 flex flex-row">
                  <div className="relative flex">
                    {/* 편집 폼을 absolute로 설정 */}
                    {reviewEdit === review.id && (
                      <div className="absolute z-0 mt-2 -top-4 right-6">
                        <ReviewEdit
                          perfumeId={perfumeId}
                          reviewId={review.id}
                          onOpenEdit={() => openEditForm(review)}
                          onDone={closeEditForm}
                        />
                      </div>
                    )}
                    <button
                      className="flex flex-col items-center justify-center px-2 cursor-pointer"
                      onClick={() => handleReviewEdit(review)}
                    >
                      <img src={kebab} alt="kebab" className="w-2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* 인라인 수정 폼 */}
            {editTarget?.id === review.id && (
              <div>
                <ReviewEditForm
                  perfumeId={perfumeId}
                  reviewId={editTarget.id}
                  defaultContent={editTarget.content}
                  defaultRating={editTarget.rating}
                  onClose={closeEditForm}
                />
              </div>
            )}
          </div>
        ))}

      {data.length > 0 && (
        <Pagination
          page={presentPage}
          hasNext={hasNext}
          onChange={setPresentPage}
          windowSize={5}
          lookAhead={1} // 다음 페이지 번호(2, 3..) 미리 노출
          isLoading={isLoading}
        />
      )}
    </div>
  );
};
