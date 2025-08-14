import { useEffect, useState } from "react";
import note1Img from "../../assets/images/sampleNote1.png";
import note2Img from "../../assets/images/sampleNote2.png";
import note3Img from "../../assets/images/sampleNote3.png";
import { ProductAccordion } from "../../components/Product/ProductAccordion";
import { ProductAccordionItem } from "../../components/Product/ProductAccordionItem";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";
import { useProductStore } from "../../store/useProductStore";
import { useGetProductDetail } from "../../hooks/queries/useGetProduct";
import { Link, useParams } from "react-router-dom";
import ReviewForm from "../../components/Product/ReviewForm";
import { ReviewList } from "../../components/Product/ReviewList";

const ProductDetail = () => {
  const [selectTab, setSelectTab] = useState<"DETAILS" | "REVIEW">("DETAILS");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const { perfumeId, setPerfumeId } = useProductStore();
  const { data, isLoading, error } = useGetProductDetail(perfumeId!);

  // 페이지 진입 시 store에 id 저장
  useEffect(() => {
    if (id) setPerfumeId(Number(id));
  }, [id, setPerfumeId]);

  if (isLoading) return <div className="p-6">로딩중…</div>;

  // 아코디언 카테고리
  const accordionItems = [
    {
      title: "노트 상세보기",
      notes: [
        { noteId: 1, name: `Top : ${data?.result.topNote ?? "정보없음"}` },
        {
          noteId: 2,
          name: `Middle : ${data?.result.middleNote ?? "정보없음"}`,
        },
        { noteId: 3, name: `Base : ${data?.result.baseNote ?? "정보없음"}` },
      ],
    },
    {
      // API 필드 수정 예정
      title: "전성분",
      content: (
        <div>
          {data?.result.ingredients?.length
            ? data.result.ingredients.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))
            : "정보없음"}
        </div>
      ),
    },
    {
      title: "사용방법",
      content: (
        <div>
          {data?.result.usage?.length
            ? data.result.usage.map((item, idx) => <div key={idx}>{item}</div>)
            : "정보없음"}
        </div>
      ),
    },
    {
      title: "사용 시 주의사항",
      content: (
        <div>
          {data?.result.warnings?.length
            ? data.result.warnings.map((item, idx) => (
                <div key={idx}>{item}</div>
              ))
            : "정보없음"}
        </div>
      ),
    },
    {
      title: "제조업자",
      content: <div>{data?.result.brand ?? "정보없음"}</div>,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-[#F7F4EF]">
      {/* 브랜드 네임, 향수 네임, 용량, 발향률, 가격 */}
      {!error ? (
        <section className="flex flex-col justify-center w-full gap-[12px]">
          <div className="flex flex-col sm:flex-row sm:px-20">
            <img
              src={data?.result.ImageUrl}
              className="pr-10 max-w-[595px] max-h-[691px] "
              alt="ImageUrl"
            />
            <div className="flex flex-col justify-center mb-10 sm:mb-30">
              <div className="items-center sm:mx-15">
                <div className="mx-5 sm:m-5 mt-2 sm:mt-0 text-base sm:text-[40px] text-[#AB3130]">
                  {data?.result.brand}
                </div>
                <div className="mx-4 mb-4 sm:m-5 sm:mb-16 text-5xl sm:text-8xl text-[#AB3130]">
                  {data?.result.name}
                </div>
              </div>
              <div className="flex flex-col sm:gap-10 mx-5 sm:mx-20 font-[pretendard] font-medium text-xl sm:text-[28px]">
                <div className="flex items-center">
                  <span className="text-[#66191F]">용량</span>
                  <span className="ml-9.5 border-l border-[#66191F] h-5" />
                  <span className="ml-2 text-[#AB3130]">
                    {data?.result.ml}mL
                  </span>
                </div>
                <div className="flex items-center">
                  <span className=" text-[#66191F]">발향률</span>
                  <span className="ml-5 sm:ml-4.5 border-l border-[#66191F] h-5" />
                  <span className="ml-2 text-[#AB3130]">
                    {data?.result.concentration}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-[#66191F]">가격</span>
                  <span className="ml-9.5 border-l border-[#66191F] h-5" />
                  <span className="ml-2 text-[#AB3130]">
                    {data?.result.price.toLocaleString()} ₩
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="items-center w-full">
            {/* 노트 이미지 및 정보 */}
            <section className="flex pt-6 py-4 justify-center gap-8 bg-[#AB3130] px-[12px] mx-auto w-full">
              <div className="flex flex-col px-4 mx-auto max-w-7xl gap-7">
                <div className="flex items-center justify-center w-full gap-4 mb-2 text-[#F7F4EF]">
                  <div className="flex-1 h-px bg-[#F7F4EF]" />
                  <div className="px-6 text-[40px] font-semibold tracking-wide">
                    Notes
                  </div>
                  <div className="flex-1 h-px bg-[#F7F4EF]" />
                </div>
                <div className="flex flex-col items-center justify-center text-[#F7F4EF] w-full text-[32px] gap-8 md:flex-row">
                  {/* Top Note */}
                  {data?.result.topNote.map((note) => (
                    <div
                      key={note.noteId}
                      className="flex flex-col items-center max-w-[345px]"
                    >
                      <img
                        src={note1Img}
                        alt={note1Img}
                        className="w-full max-h-[232px] object-cover bg-[#F7F4EF]"
                      />
                      <div className="mt-4 tracking-wide" key={note.name}>
                        {note.name}
                      </div>
                    </div>
                  ))}
                  {/* Middle Note */}
                  <div className="flex flex-col items-center w-[345px]">
                    <img
                      src={note2Img}
                      alt={note2Img}
                      className="w-full h-[232px] object-cover bg-[#F7F4EF]"
                    />
                    <div className="tracking-wide">
                      {data?.result.middleNote}
                    </div>
                  </div>
                  {/* Base Note */}
                  <div className="flex flex-col items-center text-center w-[345px]">
                    <img
                      src={note3Img}
                      alt={note3Img}
                      className="w-full h-[232px] object-cover bg-[#F7F4EF]"
                    />
                    <div className="tracking-wide">{data?.result.baseNote}</div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <div className="pt-20">상품 정보를 불러오지 못했어요.</div>
      )}
      {/* 스크랩 및 홈페이지 라우팅 버튼 */}
      <div className="flex flex-col items-center justify-center w-full max-w-5xl gap-2 py-12 mx-auto md:flex-row">
        <button className="flex flex-1 w-full hover:bg-[#AB3130]/10 items-center justify-center gap-4 border border-[#AB3130] text-[#AB3130] rounded-full py-2 px-8 text-xl sm:text-[32px] font-[pretendard] cursor-pointer">
          <img src={BookmarkIcon} width={22} alt="스크랩" />
          스크랩
        </button>
        <Link
          to={`/${data?.result.brandUrl}`}
          className="flex flex-1 items-center justify-center hover:bg-[#66191F] bg-[#AB3130] text-[#F7F4EF] rounded-full py-2 px-8 text-xl sm:text-[32px] w-full font-[pretendard] font-light cursor-pointer"
        >
          공식 홈페이지 바로가기
        </Link>
      </div>
      {/* 향수 디테일 및 리뷰 */}
      <div className="flex w-full h-12 mt-24 sm:h-16">
        <button
          className={`flex-1 flex items-center justify-center border border-[#AB3130] text-lg sm:text-[32px] cursor-pointer ${
            selectTab === "DETAILS"
              ? "text-[#F7F4EF] bg-[#AB3130]"
              : "text-[#AB3130]"
          }`}
          onClick={() => setSelectTab("DETAILS")}
        >
          DETAILS
        </button>
        <button
          className={`flex-1 flex items-center justify-center border border-[#AB3130] text-[#AB3130] text-lg sm:text-[32px] cursor-pointer ${
            selectTab === "REVIEW"
              ? "text-[#F7F4EF] bg-[#AB3130]"
              : "text-[#AB3130]"
          }`}
          onClick={() => setSelectTab("REVIEW")}
        >
          REVIEW({data?.result.reviewCount})
        </button>
      </div>
      <div>
        {selectTab === "DETAILS" ? (
          <ProductAccordion className="pt-10 pb-10 sm:pt-16 sm:pb-20">
            {accordionItems.map((item, idx) => (
              <ProductAccordionItem
                key={idx}
                title={item.title}
                open={openAccordion === idx}
                onClick={() =>
                  setOpenAccordion(openAccordion === idx ? null : idx)
                }
                notes={item.notes}
                content={item.content}
              />
            ))}
          </ProductAccordion>
        ) : (
          <>
            <ReviewForm perfumeId={perfumeId!} />
            <ReviewList perfumeId={perfumeId!} page={1} size={10} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
