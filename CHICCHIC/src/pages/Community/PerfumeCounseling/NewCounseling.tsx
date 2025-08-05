import { useState } from "react";
import { ImgUploader } from "../../../components/Community/ImgUploader";
import { useImgUploadStore } from "../../../store/useImgUploadStore";
import { X } from "lucide-react";
import { useCreateConsultPost } from "../../../hooks/mutations/useCreatePost";
import type { PostCategory } from "../../../types/enums/postCategory";
import { useNavigate } from "react-router-dom";

const NewCounseling = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [select, setSelect] = useState<"GIVE" | "RECEIVE" | "">("");
  const { url, reset } = useImgUploadStore();
  const navigate = useNavigate();
  const { mutate } = useCreateConsultPost();

  const handlePost = () => {
    if (select === "") {
      alert("글 유형을 선택해주세요");
      return;
    }

    const postType: PostCategory = select === "GIVE" ? "GIVE" : "RECEIVE";

    const payLoad = {
      postType,
      title: title.trim(),
      content: content.trim(),
      imageUrl: url ?? "",
    };
    mutate(payLoad, {
      onSuccess: (res) => {
        alert("작성 완료!");
        const consultId = res.result.consultPostId;
        navigate(`/community/recommendation/list/${consultId}`);
        reset();
        setTitle("");
        setContent("");
        setSelect("");
      },
      onError: () => alert("작성에 실패. 다시 시도해주세요."),
    });
  };

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
                select === "RECEIVE" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 justify-center items-center border rounded-full px-8 py-4 cursor-pointer border-[#AB3130]`}
              onClick={() => {
                setSelect("RECEIVE");
              }}
            >
              추천 받아요!
            </button>
            <button
              className={`${
                select === "GIVE" ? "text-white bg-[#AB3130]" : ""
              } flex flex-1 justify-center items-center border rounded-full px-8 py-4 cursor-pointer border-[#AB3130] `}
              onClick={() => {
                setSelect("GIVE");
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
            className="items-center w-full py-6 px-8 bg-transparent text-xl border border-[#AB3130] rounded-[15px] placeholder:text-[#AB3130] placeholder:text-xl focus:outline-none "
          />
        </section>

        {/* Content 입력 */}
        <label className="block text-4xl font-semibold mb-[15px] font-[crimsonText]">
          Content
        </label>
        <div className="border border-[#AB3130] rounded-[15px] overflow-hidden">
          {/* 이미지 미리보기 */}
          {url && (
            <div className="flex justify-start mt-4">
              <img
                src={url}
                alt="업로드된 이미지"
                className="mx-8 max-h-[300px] rounded-lg border border-[#AB3130]"
              />
              <button
                onClick={reset}
                className="bg-white text-[#AB3130] border border-[#AB3130] rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#AB3130] hover:text-white transition"
              >
                <X />
              </button>
            </div>
          )}
          <textarea
            placeholder="내용을 작성해주세요."
            rows={20}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="resize-none w-full py-6 px-8 bg-transparent border-none text-xl placeholder:text-[#AB3130] placeholder:text-xl focus:outline-none"
          />
          <div className="w-full py-[12px] border-t border-[#AB3130] ">
            <ImgUploader type="post" />
          </div>
        </div>

        {/* 작성 완료 버튼 */}
        <button
          className="mt-18 block mx-auto w-full h-[70px] rounded-full bg-[#AB3130] text-white text-2xl transition-colors border-none hover:bg-[#992a29]"
          onClick={handlePost}
        >
          작성 완료하기
        </button>
      </div>
    </div>
  );
};

export default NewCounseling;
