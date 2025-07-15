import { type JSX, useState } from "react";
import perfumeImg from "../../assets/images/samplePerfumeImg.png";
import note1Img from "../../assets/images/sampleNote1.png";
import note2Img from "../../assets/images/sampleNote2.png";
import note3Img from "../../assets/images/sampleNote3.png";
import { ProductAccordion } from "../../components/Product/ProductAccordion";
import { ProductAccordionItem } from "../../components/Product/ProductAccordionItem";
import ProductReviews from "../../components/Product/ProductReviews";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";

const accordionItmes = [
  "노트 상세보기",
  "전성분",
  "사용방법",
  "사용 시 주의사항",
  "제조업자",
];

const ProductDetail = (): JSX.Element => {
  const [selectTab, setSelectTab] = useState<"DETAILS" | "REVIEW">("DETAILS");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-center bg-[#F7F4EF] px-[12px]">
      {/* 브랜드 네임, 향수 네임, 용량, 발향률, 가격 UI */}
      <section className="flex justify-center md:flex-row w-full gap-[12px] max-w-7xl">
        <img src={perfumeImg} className="h-120" alt="" />
        <div className="flex flex-col justify-center">
          <div className="items-center mx-15">
            <div className="m-5 text-3xl text-[#AB3130]">Brandname</div>
            <div className="m-4 mb-16 text-6xl text-[#AB3130]">
              Perfume Name
            </div>
          </div>
          <div className="flex flex-col gap-6 mx-20 ">
            <div className="flex items-center">
              <span className="text-lg font-black text-[#66191F]">용량</span>
              <span className="ml-8 border-l border-[#66191F] h-5" />
              <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                용량
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-[#66191F]">발향률</span>
              <span className="ml-4.5 border-l border-[#66191F] h-5" />
              <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                발향률
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold text-[#66191F]">가격</span>
              <span className="ml-8 border-l border-[#66191F] h-5" />
              <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                가격
              </span>
            </div>
          </div>
        </div>
      </section>
      <div className="items-center w-full">
        {/* 노트 이미지 및 정보 UI */}
        <section className="flex pt-6 py-4 justify-center gap-8 bg-[#AB3130] px-[12px] mx-auto max-w-7xl">
          <div className="flex flex-col px-4 mx-auto max-w-7xl gap-7">
            <div className="flex items-center justify-center w-full gap-4 mb-2 text-[#F7F4EF]">
              <div className="flex-1 h-px bg-[#F7F4EF]" />
              <div className="px-6 text-2xl font-semibold tracking-wide">
                Notes
              </div>
              <div className="flex-1 h-px bg-[#F7F4EF]" />
            </div>
            <div className="flex flex-col items-center justify-center w-full gap-8 md:flex-row">
              {[note1Img, note2Img, note3Img].map((img, note) => (
                <div key={note} className="flex flex-col items-center w-60">
                  <img
                    src={img}
                    alt={`note${note + 1}`}
                    className="w-full h-33 object-cover bg-[#F7F4EF] rounded"
                  />
                  <div className="mt-4 text-base tracking-wide text-[#F7F4EF]">
                    NOTE
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* 스크랩 및 홈페이지 라우팅 버튼 */}
        <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-2 py-12 mx-auto md:flex-row">
          <button className="flex flex-1 w-full items-center justify-center gap-2 border border-[#AB3130] text-[#AB3130] rounded-full py-2 px-8 text-xl font-[pretendard] cursor-pointer">
            <img src={BookmarkIcon} width={14} alt="스크랩" />
            스크랩
          </button>
          <button className="flex flex-1 items-center justify-center bg-[#AB3130] text-[#F7F4EF] rounded-full py-2 px-8 text-xl w-full font-[pretendard] font-light cursor-pointer">
            공식 홈페이지 바로가기
          </button>
        </div>
      </div>
      {/* 향수 디테일 및 리뷰 UI */}
      <div className="flex w-full h-12 mt-24">
        <button
          className={`flex-1 flex items-center justify-center border border-[#AB3130] text-lg cursor-pointer ${
            selectTab === "DETAILS"
              ? "text-[#F7F4EF] bg-[#AB3130]"
              : "text-[#AB3130]"
          }`}
          onClick={() => setSelectTab("DETAILS")}
        >
          DETAILS
        </button>
        <button
          className={`flex-1 flex items-center justify-center border border-[#AB3130] text-[#AB3130] text-lg cursor-pointer ${
            selectTab === "REVIEW"
              ? "text-[#F7F4EF] bg-[#AB3130]"
              : "text-[#AB3130]"
          }`}
          onClick={() => setSelectTab("REVIEW")}
        >
          REVIEW(0)
        </button>
      </div>
      <div>
        {selectTab === "DETAILS" ? (
          <ProductAccordion className="pt-16 pb-20">
            {accordionItmes.map((item, idx) => (
              <ProductAccordionItem
                key={idx}
                title={item}
                open={openAccordion === idx}
                onClick={() =>
                  setOpenAccordion(openAccordion === idx ? null : idx)
                }
              >
                {item} 정보없음
              </ProductAccordionItem>
            ))}
          </ProductAccordion>
        ) : (
          <ProductReviews />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
