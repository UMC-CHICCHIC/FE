import { useState } from "react";
import { BsCheckCircleFill, BsCardImage } from "react-icons/bs";

const NewDiary = () => {
  const [isPublic, setIsPublic] = useState(true);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

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

        {/* Title 입력 */}
        <label className="block text-[40px] font-bold mb-[15px]">Title</label>
        <section className="mb-[60px]">
          <input
            type="text"
            placeholder="제목을 작성해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full h-[129px] p-[15px] bg-transparent text-[28px] border border-[#AB3130] rounded-[15px] placeholder:text-[#AB3130] placeholder:text-[28px] focus:outline-none "
          />
        </section>

        {/* Content 입력 */}
        <label className="block text-[40px] font-bold mb-[15px]">Content</label>

        <textarea
          placeholder="내용을 작성해주세요."
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-[15px] bg-transparent border border-[#AB3130] rounded-t-[15px] text-[28px] placeholder:text-[#AB3130] placeholder:text-[28px] focus:outline-none"
        />
        <div className="w-full p-[15px] mt-[-5px]  border border-[#AB3130] rounded-b-[15px] mb-[35px]">
          <button
            onClick={() => alert("이미지 첨부 기능")}
            className="flex items-center gap-[8px] px-[30px] pb-4 font-semibold bg-transparent border-none"
          >
            <BsCardImage className="w-[30px] h-[30px] text-[#AB3130]" />
            <span className="text-[#AB3130] text-[28px]">이미지 첨부하기</span>
          </button>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          className="block mx-auto w-[50%] h-[82px] rounded-full bg-[#AB3130] text-[#FFFFFF] text-white text-[28px] font-bold transition-colors border-none hover:bg-[#992a29]"
          onClick={() => alert("작성 완료!")}
        >
          작성 완료하기
        </button>
      </div>
    </div>
  );
};

export default NewDiary;
