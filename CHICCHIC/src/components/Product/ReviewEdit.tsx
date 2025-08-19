import { useDeleteProductReview } from "../../hooks/mutations/useUpdateProduct";

interface ReviewEditProps {
  perfumeId: number;
  reviewId: number;
  onOpenEdit: () => void;
  onDone?: () => void;
}

export const ReviewEdit = ({
  perfumeId,
  reviewId,
  onOpenEdit,
  onDone,
}: ReviewEditProps) => {
  const { mutate: remove, isPending: removing } =
    useDeleteProductReview(perfumeId);
  const handleReviewEdit = () => {
    onOpenEdit();
  };
  const handleReviewDelete = () => {
    if (!confirm("리뷰를 삭제하시겠습니까?")) return;
    remove(reviewId, {
      onSuccess: () => {
        alert("리뷰가 삭제되었습니다.");
        onDone?.();
        window.location.reload();
      },
      onError: (e) => {
        alert(`삭제 실패 : ${e.message ?? "잠시 후 다시 시도해주세요"}`);
      },
    });
  };

  return (
    <div className="flex flex-col justify-center itmes-center text-[#AB3130] drop-shadow-2xl text-[20px] w-[170px] h-[70px]">
      <button
        className="text-center cursor-pointer hover:bg-[#AB3130]/10 border rounded-tl-xl transition-colors border-b-0 disabled:opacity-50"
        onClick={handleReviewEdit}
      >
        수정하기
      </button>
      <button
        className="text-center border-t cursor-pointer hover:bg-[#AB3130]/10 border rounded-bl-xl rounded-br-xl shadow-lg"
        onClick={handleReviewDelete}
        disabled={removing}
      >
        삭제하기
      </button>
    </div>
  );
};
