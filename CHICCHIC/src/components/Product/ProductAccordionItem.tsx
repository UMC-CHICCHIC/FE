import type { ReactNode } from "react";
import ArrowIcon from "../../assets/icons/arrow.svg";

interface AccordionItemProps {
  title: string;
  open: boolean;
  onClick: () => void;
  children?: ReactNode;
}

export function ProductAccordionItem({
  title,
  open,
  onClick,
  children,
}: AccordionItemProps) {
  return (
    <div className="border-t border-[#AB3130] cursor-pointer select-none md:w-[780px] lg:w-[1000px]">
      <div
        className="flex items-center justify-between py-4 min-w-120"
        onClick={onClick}
      >
        <span className="text-[#AB3130] font-bold text-lg">{title}</span>
        <img
          width={44}
          src={ArrowIcon}
          className={`transition-transform duration-300 ${
            open ? "" : "rotate-180"
          }`}
        />
      </div>
      {open && <div className="pb-6 text-[#AB3130]">{children}</div>}
    </div>
  );
}
