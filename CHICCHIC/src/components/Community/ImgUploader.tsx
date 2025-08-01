import { useCallback, useRef } from "react";
import ImgIcon from "../../assets/icons/image.svg";
import useUploadImg from "../../hooks/\bmutations/useUploadImg";

export const ImgUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { mutate, isPending } = useUploadImg();

  const handleUploadImg = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      console.log("파일 이름: ", file.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        mutate({ file: base64 });
      };
      reader.readAsDataURL(file);
    },
    [mutate]
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
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={handleUploadImg}
      />
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
    </>
  );
};
