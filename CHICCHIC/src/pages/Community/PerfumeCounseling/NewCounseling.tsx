import { useState } from "react";
import ImgIcon from "../../../assets/icons/image.svg";

const NewCounseling = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [select, setSelect] = useState<"recommended" | "recommend" | "">("");

  return (
    <div className="mx-auto bg-[#F7F4EF] text-[#AB3130] flex justify-center py-16">
      {/* 게시글 카테고리 */}
      <div className="w-[70%] font-[pretendard]">
        <section className="mb-[60px]">
          <div className="flex items-baseline gap-[20px]">
            <h2 className="text-[36px] font-medium">작성글 유형</h2>
            <p className="text-sm font-light">
              작성글 유형을 선택해야 글을 작성할 수 있어요.
            </p>
          </div>
          <div className="flex mt-6 text-[18px] font-medium space-x-2 max-w-100">
            <button
              className={`${
                select === "recommended" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 justify-center items-center border rounded-full px-8 py-4 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("recommended");
              }}
            >
              추천 받아요!
            </button>
            <button
              className={`${
                select === "recommend" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 justify-center items-center border rounded-full px-8 py-4 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("recommend");
              }}
            >
              추천해요!
            </button>
          </div>
        </section>
        {/* Title 입력 */}
        <label className="block text-4xl font-semibold mb-[15px] font-[crimsonText]">
          Title
        </label>
        <section className="mb-[60px]">
          <input
            type="text"
            placeholder="제목을 작성해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="items-center w-full py-6 px-8 bg-transparent text-[28px] border border-[#AB3130] rounded-[15px] placeholder:text-[#AB3130] placeholder:text-xl focus:outline-none "
          />
        </section>

        {/* Content 입력 */}
        <label className="block text-4xl font-semibold mb-[15px] font-[crimsonText]">
          Content
        </label>
        <div className="border border-[#AB3130] rounded-[15px] overflow-hidden">
          <textarea
            placeholder="내용을 작성해주세요."
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none w-full py-6 px-8 bg-transparent border-none text-md placeholder:text-[#AB3130] placeholder:text-xl focus:outline-none"
          />
          <div className="w-full py-[12px] px-8 border-t border-[#AB3130]">
            <button
              onClick={() => alert("이미지 첨부 기능")}
              className="flex items-center gap-[16px] px-[40px] font-semibold bg-transparent border-none"
            >
              <img src={ImgIcon} alt="imgIcon" width={26} />
              <span className="text-[#AB3130] text-2xl font-normal">
                이미지 첨부하기
              </span>
            </button>
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          className="mt-18 block mx-auto w-full h-[70px] rounded-full bg-[#AB3130] text-white text-2xl transition-colors border-none hover:bg-[#992a29]"
          onClick={() => alert("작성 완료!")}
        >
          작성 완료하기
        </button>
      </div>
    </div>
  );
};

export default NewCounseling;
