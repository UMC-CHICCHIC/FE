import { useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/key";
import {
  createProductReview,
  deleteProductReview,
  updateProductReview,
} from "../../apis/products";
import type {
  RequestProductReviewDto,
  ResponseUpdateReviewDto,
} from "../../types/perfumes";

// 향수 리뷰 작성
export function useCreateProductReview(perfumeId: number) {
  const queryClient = useQueryClient();

  return useMutation<ResponseUpdateReviewDto, Error, RequestProductReviewDto>({
    mutationFn: (body) => createProductReview(perfumeId, body),
    onSuccess: (res) => {
      console.log("작성 성공", res.result.id);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.reviews, perfumeId],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.products, perfumeId],
      });
    },
  });
}

// 향수 리뷰 수정
export function useUpdateProductReview(perfumeid: number, reviewId: number) {
  const queryClient = useQueryClient();

  return useMutation<ResponseUpdateReviewDto, Error, RequestProductReviewDto>({
    mutationFn: (body) => updateProductReview(perfumeid, reviewId, body),
    onSuccess: (res) => {
      console.log("수정 성공", res.result.id);
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.reviews, perfumeid],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.products, perfumeid],
      });
    },
  });
}

// 향수 리뷰 삭제
export const useDeleteProductReview = (perfumeId: number) => {
  const qc = useQueryClient();
  return useMutation<void, Error, number>({
    mutationFn: (reviewId) => deleteProductReview(perfumeId, reviewId),
    onSuccess: (res) => {
      console.log("삭제 성공", res);
      qc.invalidateQueries({ queryKey: [QUERY_KEY.reviews, perfumeId] });
      qc.invalidateQueries({ queryKey: [QUERY_KEY.products, perfumeId] });
    },
  });
};
