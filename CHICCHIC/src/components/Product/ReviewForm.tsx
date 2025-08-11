// import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCreateProductReview } from "../../hooks/mutations/useUpdateProduct";
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";
import type { Rating } from "../../types/perfumes";
import { StarRating } from "./StarRating";

interface ProductReviewProps {
  perfumeId: number;
}

const ReviewForm = ({ perfumeId }: ProductReviewProps) => {
  const { isLoggedIn } = useAuth();
  const [review, setReivew] = useState("");
  const [rating, setRating] = useState<Rating>(4.5);
  const navigate = useNavigate();
  const { mutate } = useCreateProductReview(perfumeId);

  const handleCreateReview = () => {
    if (!isLoggedIn) {
      alert("로그인 후 사용가능한 서비스입니다.");
      navigate("/login");
      return;
    }
    const content = review.trim();
    if (!content) {
      alert("리뷰 내용을 입력하세요.");
      return;
    }

    const payLoad = {
      rating,
      content: review.trim(),
    };

    mutate(payLoad, {
      onSuccess: () => {
        alert("작성 완료!");
        setReivew("");
      },
    });
  };

  return (
    <div className="flex text-[#AB3130] items-center justify-center m-4 sm:m-14 md:w-[800px] lg:w-[1000px]">
      <div className="flex flex-col flex-1 w-full lg:w-[800px]">
        <span className="text-4xl ">REVIEWS</span>
        <div className="flex flex-col font-[pretendard] border-[1.8px] border-[#AB3130] rounded py-6 px-6 sm:px-16 mt-6">
          <span className="py-2 text-xl font-medium sm:text-3xl">
            리뷰 작성
          </span>
          <span className="pb-2 text-xs font-light sm:text-xl">
            향수에 대한 느낌, 만족도에 대해 작성해주세요.
          </span>
          <StarRating rating={rating} onChange={setRating} />
          <div className="flex flex-col items-center justify-center">
            <textarea
              placeholder="리뷰 작성하기"
              className="resize-none placeholder:opacity-50 border border-[#AB3130] rounded-xl outline-[#AB3130] text-base sm:text-xl w-full min-h-80 font-light px-6 py-4 mb-6"
              value={review}
              onChange={(e) => setReivew(e.target.value)}
            />
            <div className="flex justify-end flex-1 w-full">
              <button
                type="button"
                className="flex items-center hover:bg-[#66191F] cursor-pointer justify-center text-white bg-[#AB3130] rounded-full px-10 py-2 mb-4 font-[pretendard] text-xl font-light"
                onClick={handleCreateReview}
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewForm;
