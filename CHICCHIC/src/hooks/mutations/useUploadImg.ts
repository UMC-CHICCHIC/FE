import { useMutation } from "@tanstack/react-query";
import { uploadImg } from "../../apis/postApi";
import type { RequestImgDto } from "../../types/img";
import type { ResponseUploadImg } from "../../types/img";

function useUploadImg() {
  return useMutation({
    mutationFn: uploadImg,

    onMutate: async (variables: RequestImgDto) => {
      const { file } = variables;
      console.log("이미지 업로드 시작 전 :", file);
    },
    onSuccess: (data: ResponseUploadImg) => {},
  });
}

export default useUploadImg;
