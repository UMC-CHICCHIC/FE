// import { useState } from 'react';
import starFull from "../../assets/icons/starFull.svg";
import starHalf from "../../assets/icons/starHalf.svg";

const ProductReviews = () => {
  // 커스텀 훅 추가 예정
  // const [textValue, setTextvalue] = useState("");

  // const handleSetValue = (e:Event) => {
  //   setTextvalue(e.target?.value);
  // }

  return (
    <div className="flex items-center justify-center m-14 md:w-[800px] lg:w-[1000px]">
      <div className="flex flex-col flex-1 w-full lg:w-[800px]">
        <span className="text-[#AB3130] text-4xl">REVIEWS</span>
        <div className="flex flex-col border-[1.8px] border-[#AB3130] rounded py-6 px-16 mt-6">
          <span className="text-[#AB3130] text-2xl font-bold py-2">
            리뷰 작성
          </span>
          <span className="text-[#AB3130] pb-2 font-[pretendard] font-light text-xl">
            향수에 대한 느낌, 만족도에 대해 작성해주세요.
          </span>
          <div className="flex items-center justify-start gap-1 pb-6 text-xl">
            <img src={starFull} width={22} />
            <img src={starFull} width={22} />
            <img src={starFull} width={22} />
            <img src={starFull} width={22} />
            <img src={starHalf} width={22} />
            <span className="ml-2 text-2xl text-[#AB3130]">4.5/5</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <textarea
              placeholder="리뷰 작성하기"
              className="resize-none placeholder-[#AB3130] placeholder:opacity-50 border border-[#AB3130] rounded-xl font-[pretendard] outline-[#AB3130] text-md w-full min-h-80 font-light px-6 py-4 mb-6"
              onChange={(e) => e.target.value}
            />
            <div className="flex justify-end flex-1 w-full">
              <button
                type="button"
                className="flex items-center justify-center text-white bg-[#AB3130] rounded-full px-10 py-2 mb-4 font-[pretendard] text-xl font-light"
              >
                등록하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
