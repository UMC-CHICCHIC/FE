import { useUpdateScrap } from "../../hooks/mutations/useUpdateScrap";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";
import BookmarkFullIcon from "../../assets/icons/BookmarkFull.svg";

interface ScrapProps {
  productId: number;
  scrapped: boolean;
}

export const ScrapButton = ({ productId, scrapped }: ScrapProps) => {
  const { toggle } = useUpdateScrap(productId);

  return (
    <button
      className="flex flex-1 w-full hover:bg-[#AB3130]/10 items-center justify-center gap-2 sm:gap-4 border border-[#AB3130] text-[#AB3130] rounded-full py-2 px-8 text-xl sm:text-[32px] font-[pretendard] cursor-pointer"
      onClick={() => toggle(scrapped)}
    >
      {scrapped ? (
        <img
          src={BookmarkFullIcon}
          alt="스크랩full"
          className="sm:w-[22px] sm:h-[28.7px] w-6 h-6"
        />
      ) : (
        <img
          src={BookmarkIcon}
          className="sm:w-[22px] sm:h-[28.7px] w-6 h-6"
          alt="스크랩"
        />
      )}
      스크랩
    </button>
  );
};
