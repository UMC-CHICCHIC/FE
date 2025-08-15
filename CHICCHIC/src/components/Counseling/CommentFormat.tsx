import { useState } from "react";
import arrowUp from "../../assets/icons/arrowUp.svg"; // 프로젝트 경로에 맞게 조정
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

type Props = {
  placeholder?: string;
  onSubmit: (content: string) => Promise<void> | void;
};

export function CommentFormat({ placeholder = "댓글 달기", onSubmit }: Props) {
  const [value, setValue] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent">
      <input
        className="flex-1 p-4 bg-transparent focus:outline-none"
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        onKeyDown={async (e) => {
          if (e.key === "Enter" && value.trim()) {
            await onSubmit(value);
            setValue("");
          }
          if (isLoggedIn) {
            alert("로그인이 필요한 서비스입니다.");
            navigate("/login");
            return;
          }
        }}
      />
      <button
        className="p-2 pr-3"
        onClick={async () => {
          if (!value.trim()) {
            if (isLoggedIn) {
              console.log("버튼 눌림");
              alert("로그인이 필요한 서비스입니다.");
              navigate("/login");
              return;
            }
          }
          await onSubmit(value);
          setValue("");
        }}
      >
        <img
          className="bg-[#AB3130] border rounded-full p-1 cursor-pointer hover:bg-[#872b2b] w-full"
          src={arrowUp}
          alt="submit"
          width={35}
        />
      </button>
    </div>
  );
}
