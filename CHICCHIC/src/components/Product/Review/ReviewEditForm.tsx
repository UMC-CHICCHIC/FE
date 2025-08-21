import { useState } from "react";
import type { Rating } from "../../../types/perfumes";
import { useUpdateProductReview } from "../../../hooks/mutations/useUpdateProduct"; // 경로 예시
import { StarRating } from "../Detail/StarRating";

interface ReviewEditFormProps {
  perfumeId: number;
  reviewId: number;
  defaultContent: string;
  defaultRating: Rating;
  onClose: () => void; // 저장/취소 후 닫기
  onSaved?: () => void; // 저장 성공 후 후처리(리스트 새로고침 후 포커싱 등)
}

export const ReviewEditForm = ({
  perfumeId,
  reviewId,
  defaultContent,
  defaultRating,
  onClose,
  onSaved,
}: ReviewEditFormProps) => {
  const [content, setContent] = useState(defaultContent);
  const [rating, setRating] = useState<Rating>(defaultRating);

  const { mutate: update, isPending: saving } = useUpdateProductReview(
    perfumeId,
    reviewId
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) {
      alert("내용을 입력해주세요.");
      return;
    }
    update(
      { content: content.trim(), rating }, // RequestProductReviewDto 형태에 맞게
      {
        onSuccess: () => {
          alert("리뷰가 수정되었습니다.");
          onSaved?.();
          onClose();
          window.location.reload();
        },
        onError: (e) => {
          alert(`수정 실패: ${e.message ?? "잠시 후 다시 시도해주세요."}`);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="text-[#AB3130]">
      <div>
        <label className="block text-xl text-[#AB3130] mb-4">평점</label>
        <StarRating rating={rating} onChange={setRating} />
      </div>

      <div>
        <label className="block text-xl text-[#AB3130] mb-2">내용</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full min-h-[120px] border rounded px-3 py-2 resize-none outline-[#AB3130]"
          placeholder="리뷰 내용을 입력하세요"
        />
      </div>

      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onClose}
          className="px-6 py-1 border cursor-pointer rounded-full hover:bg-[#AB3130]/10 transition-colors"
        >
          취소
        </button>
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-1 rounded-full hover:bg-[#66191F] transition-colors bg-[#AB3130] text-white disabled:opacity-50 cursor-pointer"
        >
          {saving ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
};
