import { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import NewDiaryComponent from "../../../components/Diary/NewDiaryComponent";

const NewDiary = () => {
  const [isPublic, setIsPublic] = useState(true);

  return (
    <div className="mx-auto bg-[#F7F4EF] text-[#AB3130] flex justify-center py-10">
      <div className="w-[70%]">
        {/* 게시글 공개여부 */}
        <section className="mb-[60px]">
          <div className="flex items-baseline gap-[20px]">
            <h2 className="text-[36px] font-bold">게시글 공개여부</h2>
            <p className="text-[20px] text-gray-500">
              공개하지 않으면 나만 볼 수 있어요.
            </p>
          </div>
          <div
            className="mt-4 flex items-center gap-[15px] cursor-pointer"
            onClick={() => setIsPublic(!isPublic)}
          >
            <BsCheckCircleFill
              className={`w-[35px] h-[35px] transition-colors ${
                isPublic ? "text-[#AB3130]" : "text-gray-300"
              }`}
            />
            <span className="text-[28px] font-semibold select-none">
              공개하기
            </span>
          </div>
        </section>
        <NewDiaryComponent />
      </div>
    </div>
  );
};

export default NewDiary;
