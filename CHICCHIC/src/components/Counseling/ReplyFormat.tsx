import { useState } from "react";
import arrowUp from "../../assets/icons/arrowUp.svg";

type Props = {
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
};

export function ReplyFormat({ placeholder = "답글 쓰기", onSubmit }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-4 bg-transparent sm:p-4 focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && value.trim()) {
            await onSubmit(value);
            setValue("");
          }
        }}
      />
      <button
        className="p-2 pr-3 cursor-pointer"
        onClick={async () => {
          if (!value.trim()) return;
          await onSubmit(value);
          setValue("");
        }}
      >
        <img
          className="bg-[#AB3130] border rounded-full p-1 hover:bg-[#872b2b] w-full"
          src={arrowUp}
          alt="submit"
          width={35}
        />
      </button>
    </div>
  );
}
