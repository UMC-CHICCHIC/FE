import { useEffect, useState } from "react";
import note1Img from "../../assets/images/sampleNote1.png";
import note2Img from "../../assets/images/sampleNote2.png";
import note3Img from "../../assets/images/sampleNote3.png";
import { ProductAccordion } from "../../components/Product/ProductAccordion";
import { ProductAccordionItem } from "../../components/Product/ProductAccordionItem";
import ProductReviews from "../../components/Product/ProductReviews";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";
import perfumeImg from "../../assets/images/samplePerfumeImg.png";
import { useProductStore } from "../../store/useProductStore";
import { useGetProductDetail } from "../../hooks/queries/useGetProduct";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const [selectTab, setSelectTab] = useState<"DETAILS" | "REVIEW">("DETAILS");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { id } = useParams<{ id: string }>();
  const { perfumeId, setPerfumeId } = useProductStore();
  // 더미 노트 이미지
  const notePlaceholders = [note1Img, note2Img, note3Img];

  // 페이지 진입 시 store에 id 저장
  useEffect(() => {
    if (id) setPerfumeId(Number(id));
  }, [id, setPerfumeId]);

  const { data, isLoading, error } = useGetProductDetail(perfumeId!);

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
      title: "사용방법",
      content: <div>{data?.result.usage ?? "정보없음"}</div>,
    },
    {
      title: "사용 시 주의사항",
      content: <div>{data?.result.warnings ?? "정보없음"}</div>,
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center bg-[#F7F4EF] px-[12px]">
      {/* 브랜드 네임, 향수 네임, 용량, 발향률, 가격 */}
      {error ? (
        <section className="flex justify-center md:flex-row w-full gap-[12px] max-w-7xl">
          <img src={perfumeImg} className="h-120" alt="" />
          <div className="flex flex-col justify-center">
            <div className="items-center mx-15">
              <div className="m-5 text-3xl text-[#AB3130]">
                {data?.result.brand}
              </div>
              <div className="m-4 mb-16 text-6xl text-[#AB3130]">
                {data?.result.name}
              </div>
            </div>
            <div className="flex flex-col gap-6 mx-20 ">
              <div className="flex items-center">
                <span className="text-lg font-black text-[#66191F]">용량</span>
                <span className="ml-8 border-l border-[#66191F] h-5" />
                <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                  {data?.result.ml}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-[#66191F]">발향률</span>
                <span className="ml-4.5 border-l border-[#66191F] h-5" />
                <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                  {data?.result.concentration}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-lg font-bold text-[#66191F]">가격</span>
                <span className="ml-8 border-l border-[#66191F] h-5" />
                <span className="ml-2 text-[#AB3130] font-extrabold text-lg">
                  {data?.result.price}
                </span>
              </div>
            </div>
          </div>
          <div className="items-center w-full">
            {/* 노트 이미지 및 정보 */}
            <section className="flex pt-6 py-4 justify-center gap-8 bg-[#AB3130] px-[12px] mx-auto w-full">
              <div className="flex flex-col px-4 mx-auto max-w-7xl gap-7">
                <div className="flex items-center justify-center w-full gap-4 mb-2 text-[#F7F4EF]">
                  <div className="flex-1 h-px bg-[#F7F4EF]" />
                  <div className="px-6 text-2xl font-semibold tracking-wide">
                    Notes
                  </div>
                  <div className="flex-1 h-px bg-[#F7F4EF]" />
                </div>
                <div className="flex flex-col items-center justify-center w-full gap-8 md:flex-row">
                  {data?.result.notes.map((note, idx) => (
                    <div
                      key={note.noteId}
                      className="flex flex-col items-center w-60"
                    >
                      <img
                        src={notePlaceholders[idx % notePlaceholders.length]}
                        alt={`note${idx + 1}`}
                        className="w-full h-33 object-cover bg-[#F7F4EF] rounded"
                      />
                      <div className="mt-4 text-base tracking-wide text-[#F7F4EF]">
                        {note.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <div className="pt-20">상품 정보를 불러오지 못했어요.</div>
      )}
      {/* 스크랩 및 홈페이지 라우팅 버튼 */}
      <div className="flex flex-col items-center justify-center w-full max-w-3xl gap-2 py-12 mx-auto md:flex-row">
        <button className="flex flex-1 w-full hover:bg-[#AB3130]/10 items-center justify-center gap-2 border border-[#AB3130] text-[#AB3130] rounded-full py-2 px-8 text-xl font-[pretendard] cursor-pointer">
          <img src={BookmarkIcon} width={14} alt="스크랩" />
          스크랩
        </button>
        <button className="flex flex-1 items-center justify-center hover:bg-[#66191F] bg-[#AB3130] text-[#F7F4EF] rounded-full py-2 px-8 text-xl w-full font-[pretendard] font-light cursor-pointer">
          공식 홈페이지 바로가기
        </button>
      </div>
      {/* 향수 디테일 및 리뷰 */}
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
          REVIEW({data?.result.reviewCount})
        </button>
      </div>
      <div>
        {selectTab === "DETAILS" ? (
          <ProductAccordion className="pt-16 pb-20">
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
          <ProductReviews perfumeId={perfumeId!} />
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
