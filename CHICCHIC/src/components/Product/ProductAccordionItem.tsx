import type { ReactNode } from "react";
import ArrowIcon from "../../assets/icons/arrow.svg";
import type { Notes } from "../../types/products";

interface AccordionItemProps {
  title: string;
  open: boolean;
  onClick: () => void;
  notes?: Notes[];
  content?: ReactNode;
}

export function ProductAccordionItem({
  title,
  open,
  onClick,
  notes,
  content,
}: AccordionItemProps) {
  return (
    <div className="font-[pretendard] border-t border-[#AB3130] cursor-pointer select-none w-full sm:w-[780px] lg:w-[1000px]">
      <div
        className="flex items-center justify-between min-w-90"
        onClick={onClick}
      >
        <span className="text-[#AB3130] font-medium text-lg md:text-[28px]">
          {title}
        </span>
        <img
          src={ArrowIcon}
          className={`transition-transform duration-300 w-10 h-12 md:w-14 md:h-20 ${
            open ? "" : "rotate-180"
          }`}
        />
      </div>

      {open && (
        <div className="pb-6 text-[#AB3130] max-w-80 sm:max-w-none flex flex-col gap-2">
          {notes?.length
            ? notes.map((note) => <div key={note.noteId}>{note.name}</div>)
            : content}
        </div>
      )}
    </div>
  );
}
