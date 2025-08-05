import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadPostImg, uploadProfileImg } from "../../apis/postApi";
import { useImgUploadStore } from "../../store/useImgUploadStore";
import type { ResponseUploadImg } from "../../types/img";
import { QUERY_KEY } from "../../constants/key";

// 게시글 이미지 업로드
export function useUploadPostImg() {
  const setImg = useImgUploadStore((s) => s.setImg);

  return useMutation<ResponseUploadImg>({
    mutationFn: uploadPostImg,
    onSuccess: (res) => {
      setImg(res.result.url, res.result.key);
      console.log("이미지 업로드 성공");
    },
    onError: (e) => {
      console.error("업로드 에러", e);
      alert("업로드 에러");
    },
  });
}

// 프로필 아바타 이미지 업로드
export function useUploadProfileImg() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadProfileImg,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.myInfo],
      });
    },
    onError: () => alert("프로필 이미지 업로드 실패"),
  });
}
