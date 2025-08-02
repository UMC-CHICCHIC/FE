import { useCallback, useRef } from "react";
import ImgIcon from "../../assets/icons/image.svg";
import {
  useUploadPostImg,
  useUploadProfileImg,
} from "../../hooks/mutations/useUploadImg";
import { Pencil } from "lucide-react";

type ImgUploaderProps = {
  type: "profile" | "post";
};

export const ImgUploader = ({ type }: ImgUploaderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  // mutate 게시글 이미지 업로드
  const { mutate: mutatePostImg, isPending: isPostPending } =
    useUploadPostImg();
  // mutate 프로필 이미지 업로드
  const { mutate: mutateProfileImg, isPending: isProfilePending } =
    useUploadProfileImg();

  const isPending = type === "post" ? isPostPending : isProfilePending;

  const handleUploadImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      console.log("파일 이름: ", file.name);

      if (type === "post") mutatePostImg(file);
      else mutateProfileImg(file);
    },
    [type, mutatePostImg, mutateProfileImg]
  );

  const handleUploadImageButtonClick = useCallback(() => {
    if (!inputRef.current) {
      return;
    }
    inputRef.current.click();
  }, []);

  return (
    <>
      <input
        type="file"
        accept=".jpg, .jpeg, .png, .gif"
        ref={inputRef}
        className="hidden"
        onChange={handleUploadImg}
      />
      {type === "post" ? (
        <button
          disabled={isPending}
          onClick={handleUploadImageButtonClick}
          className="flex items-center gap-[16px] px-[40px] font-semibold bg-transparent border-none cursor-pointer"
        >
          <img src={ImgIcon} alt="imgIcon" width={26} />
          <span className="text-[#AB3130] text-2xl font-normal">
            이미지 첨부하기
          </span>
        </button>
      ) : (
        <button
          disabled={isPending}
          onClick={handleUploadImageButtonClick}
          className="absolute bottom-2.5 right-0 w-8 h-8 bg-[#AB3130] rounded-full flex items-center justify-center hover:bg-[#8b2a25] transition-colors shadow-lg"
        >
          <Pencil size={14} className="text-white" />
        </button>
      )}
    </>
  );
};
