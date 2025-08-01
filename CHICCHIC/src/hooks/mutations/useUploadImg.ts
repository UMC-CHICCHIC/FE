import { useMutation } from "@tanstack/react-query";
import { uploadImg } from "../../apis/postApi";
import { useImgUploadStore } from "../../store/useImgUploadStore";
import type { ResponseUploadImg } from "../../types/img";

function useUploadImg() {
  const setImg = useImgUploadStore((s) => s.setImg);
  return useMutation({
    mutationFn: uploadImg,
    onSuccess: (res: ResponseUploadImg) => {
      setImg(res.result.url, res.result.key);
      console.log("이미지 업로드 성공");
    },
    onError: (e) => {
      console.error("업로드 에러", e);
      alert("업로드 에러");
    },
  });
}

export default useUploadImg;
