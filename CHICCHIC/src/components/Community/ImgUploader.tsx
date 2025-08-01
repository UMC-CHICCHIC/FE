import { useRef } from "react";
import ImgIcon from "../../../assets/icons/image.svg";

export const ImgUploader = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleImgUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
  };

  return (
    <div className="w-full py-[12px] border-t border-[#AB3130]">
      <button
        onClick={() => handleImgUpload}
        className="flex items-center gap-[16px] px-[40px] font-semibold bg-transparent border-none"
      >
        <img src={ImgIcon} alt="imgIcon" width={26} />
        <span className="text-[#AB3130] text-2xl font-normal">
          이미지 첨부하기
        </span>
      </button>
    </div>
  );
};
