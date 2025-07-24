// import { useState } from "react";
import { usePostFilter } from "../../../store/usePostFilter";
import { POST_CATEGORY } from "../../../types/post";

const CounselingDetail = () => {
  // const [comment, setComment] = useState("");
  // const [select, setSelect] = useState("");
  // 카테고리 저장
  const { category } = usePostFilter();
  const select = POST_CATEGORY[category];

  return (
    <div>
      <section className="text-[#AB3130]">
        <div className="flex mt-6 text-[18px] font-medium space-x-2 max-w-100">
          <p className="flex flex-1 justify-center items-center border rounded-full px-6 py-4 text-white bg-[#AB3130] border-[#AB3130]">
            {select}
          </p>
        </div>
      </section>
      <section></section>
    </div>
  );
};

export default CounselingDetail;
