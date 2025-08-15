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
    <div className="font-[pretendard] border-t border-[#AB3130] cursor-pointer select-none md:w-[780px] lg:w-[1000px]">
      <div
        className="flex items-center justify-between py-4 min-w-120"
        onClick={onClick}
      >
        <span className="text-[#AB3130] font-medium text-lg">{title}</span>
        <img
          width={44}
          src={ArrowIcon}
          className={`transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
        />
      </div>

      {open && (
        <div className="pb-6 text-[#AB3130] flex flex-col gap-2">
          {notes?.length
            ? notes.map((note, idx) => <div key={idx}>{note.name}</div>)
            : content}
        </div>
      )}
    </div>
  );
}
