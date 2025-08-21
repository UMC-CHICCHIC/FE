import { useState, useRef } from "react";
import arrowUp from "../../assets/icons/arrowUp.svg";

type Props = {
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
};

export function ReplyFormat({ placeholder = "답글 쓰기", onSubmit }: Props) {
  const [value, setValue] = useState("");
  const [pending, setPending] = useState(false);
  const lastSubmitAtRef = useRef<number>(0); // 아주 빠른 연타 보호(선택)

  const handleSubmit = async () => {
    const text = value.trim();
    if (!text || pending) return;

    // 짧은 시간 내의 중복 클릭/엔터 보호 (예: 700ms)
    const now = Date.now();
    if (now - lastSubmitAtRef.current < 700) return;
    lastSubmitAtRef.current = now;

    try {
      setPending(true);
      await onSubmit(text);
      setValue("");
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent">
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 px-4 bg-transparent sm:p-4 focus:outline-none disabled:opacity-50"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && value.trim()) {
            await handleSubmit();
          }
        }}
        disabled={pending}
      />
      <button
        className="p-2 pr-3 cursor-pointer disabled:opacity-50"
        type="button"
        onClick={handleSubmit}
        disabled={pending}
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
