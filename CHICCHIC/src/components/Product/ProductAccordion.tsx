import type { ReactNode } from "react";

interface AccordionProps {
  children: ReactNode;
  className?: string;
}

export const ProductAccordion = ({ children, className }: AccordionProps) => {
  return <div className={className ?? ""}>{children}</div>;
};
