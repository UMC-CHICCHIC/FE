import { useState } from "react";
import { usePostFilter } from "../../../store/usePostFilter";
import { POST_CATEGORY } from "../../../types/post";
import arrowUp from "../../../assets/icons/arrowUp.svg";
import { useGetConsultDetail } from "../../../hooks/queries/useGetConsultPost";
import { useCounselingStore } from "../../../store/useConsultPost";

const CounselingDetail = () => {
  // const [comment, setComment] = useState("");

  const { category } = usePostFilter();
  const select = POST_CATEGORY[category];
  const { consultPostId } = useCounselingStore();
  const { data } = useGetConsultDetail(consultPostId!);
  const [openReply, setOpenReply] = useState(true);

  const handleReplyClick = () => {
    setOpenReply((prev) => !prev);
  };

  return (
    <div className="max-w-6xl px-4 sm:text-xl mx-auto text-[#AB3130] font-[pretendard]">
      {/* 카테고리 표시 */}
      <section className="flex mt-8 sm:text-[18px] sm:pb-12 pb-12 font-medium space-x-2 max-w-50">
        <p className="flex flex-1 justify-center items-center border rounded-full px-4 py-3 sm:px-6 sm:py-4 text-white bg-[#AB3130] border-[#AB3130]">
          {select}
        </p>
      </section>
      {/* 작성 게시물 상세정보 */}
      <section>
        <span className="text-2xl font-medium sm:text-4xl ">
          {data?.result.title}
        </span>
        <div className="flex py-8 border-b">
          <img
            className="max-w-20 max-h-20"
            src={"/profile.png"}
            alt="profile"
          />
          <div className="flex flex-col items-center justify-center gap-2 pl-4">
            <span>{data?.result.nickname}</span>
            <span>{data?.result.dateTime}</span>
          </div>
        </div>
        <div className="pt-6 border-b">
          <img src={data?.result.imageUrl} alt="uploadedImg" />
          <p className="pt-8 pb-20">{data?.result.content}</p>
        </div>
        {/* 댓글란 */}
        <section>
          <p className="pt-8 font-medium">댓글 1</p>
          <div className="flex py-8 border-b">
            <img className="w-12 h-12" src={"/profile.png"} alt="" />
            <div className="flex flex-col w-full pl-10">
              <p>닉네임</p>
              <p className="py-4">댓글댓글</p>
              <div className="text-[#66191F] space-x-8 text-sm pb-2">
                <span>2025.07.01. 19:48</span>
                <button
                  type="button"
                  className="cursor-pointer hover:underline"
                  onClick={() => handleReplyClick()}
                >
                  {openReply ? "답글쓰기" : "답글닫기"}
                </button>
              </div>
              {!openReply && (
                // 답글 입력창
                <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent">
                  <input
                    type="text"
                    placeholder="답글 쓰기"
                    className="flex-1 px-4 bg-transparent sm:p-4 focus:outline-none"
                  />
                  <button className="p-2 pr-3 cursor-pointer">
                    <img
                      className="bg-[#AB3130] border rounded-full p-1 hover:bg-[#872b2b] w-full"
                      src={arrowUp}
                      alt="arrowUp"
                      width={35}
                    />
                  </button>
                </div>
              )}
            </div>
          </div>
        </section>
        {/* 댓글 입력창 */}
        <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent my-15">
          <input
            className="flex-1 p-4 focus:outline-none"
            type="text"
            placeholder="댓글 달기"
          />
          <button className="p-2 pr-3">
            <img
              className="bg-[#AB3130] border rounded-full p-1 cursor-pointer hover:bg-[#872b2b] w-full"
              src={arrowUp}
              alt="arrowUp"
              width={35}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default CounselingDetail;
