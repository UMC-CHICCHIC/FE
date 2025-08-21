import { useEffect, useState } from "react";
import note1Img from "../../assets/images/sampleNote1.png";
import note2Img from "../../assets/images/sampleNote2.png";
import note3Img from "../../assets/images/sampleNote3.png";
import { ProductAccordion } from "../../components/Product/Detail/ProductAccordion";
import { ProductAccordionItem } from "../../components/Product/Detail/ProductAccordionItem";
import BookmarkIcon from "../../assets/icons/Bookmark.svg";
import BookmarkFull from "../../assets/icons/BookmarkFull.svg";
import { useProductStore } from "../../store/useProductStore";
import {
  useGetProductDetail,
  useScrapStatus,
} from "../../hooks/queries/useGetProduct";
import { useNavigate, useParams } from "react-router-dom";
import ReviewForm from "../../components/Product//Review/ReviewForm";
import { ReviewList } from "../../components/Product/Review/ReviewList";
import { useUpdateScrap } from "../../hooks/mutations/useUpdateScrap";
import { useAuth } from "../../hooks/useAuth";

const ProductDetail = () => {
  const [selectTab, setSelectTab] = useState<"DETAILS" | "REVIEW">("DETAILS");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const { perfumeId: urlPerfumeId } = useParams<{ perfumeId: string }>();
  const { perfumeId, setPerfumeId } = useProductStore();
  // 스크랩 토클
  const { toggle, isMutating } = useUpdateScrap(perfumeId!);
  // 스크랩 상태
  const { data: isScrapped = false } = useScrapStatus(perfumeId!);
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  // 페이지 진입 시 store에 id 저장
  useEffect(() => {
    if (urlPerfumeId) {
      setPerfumeId(Number(urlPerfumeId));
    }
  }, [urlPerfumeId, setPerfumeId]);

  const { data, isLoading, error } = useGetProductDetail(
    perfumeId ?? undefined
  );

  if (isLoading) return <div className="p-6">로딩중…</div>;
  if (error) return <div className="p-6">상품 정보를 불러오지 못했어요.</div>;

  // 아코디언 카테고리
  const accordionItems = [
    {
      title: "노트 상세보기",
      notes: [
        {
          noteId: 1,
          name: `Top : ${
            data?.result.topNote.map((i) => i.name) ?? "정보없음"
          }`,
        },
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
              className="pr-10 max-w-[595px] ml-10 max-h-[691px] "
              alt="ImageUrl"
            />
            <div className="flex flex-col justify-center mb-10">
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
                  <span className="ml-9.5 sm:ml-10 border-l border-[#66191F] h-5" />
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
                  <span className="sm:ml-10 ml-9.5 border-l border-[#66191F] h-5" />
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
                <div className="flex flex-col items-center justify-center text-[#F7F4EF] w-full text-[32px] gap-16 md:flex-row md:items-start">
                  {/* Top Note */}
                  <div className="flex flex-col items-center text-center w-[345px]">
                    <img
                      src={note1Img}
                      alt={note1Img}
                      className="w-full h-[232px] object-cover"
                    />
                    {data?.result.topNote.map((note) => (
                      <div key={note.noteId}>
                        <div className="tracking-wide" key={note.name}>
                          {note.name}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Middle Note */}
                  <div className="flex flex-col items-center text-center w-[345px]">
                    <img
                      src={note2Img}
                      alt={note2Img}
                      className="w-full h-[232px] object-cover flex-none"
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
                      className="w-full h-[232px] object-cover"
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
        <button
          onClick={() => {
            // 스크랩 로그인 검사
            if (!isLoggedIn) {
              alert("로그인이 필요한 서비스입니다.");
              navigate("/login");
              return;
            }
            toggle(isScrapped);
          }}
          disabled={isMutating}
          className={`flex flex-1 w-full items-center justify-center gap-2 sm:gap-4 border rounded-full text-[#AB3130] py-2 px-8 text-xl sm:text-[32px] font-[pretendard] cursor-pointer transition-colors ${
            isScrapped
              ? "border-[#AB3130] hover:bg-[#AB3130]/10"
              : "border-[#AB3130] hover:bg-[#AB3130]/10"
          }`}
        >
          <img
            src={isScrapped ? BookmarkFull : BookmarkIcon}
            className={`sm:w-[22px] sm:h-[28.7px] w-6 h-6`}
            alt="스크랩"
          />
          스크랩
        </button>
        <button
          className="flex flex-1 items-center justify-center hover:bg-[#66191F] bg-[#AB3130] text-[#F7F4EF] rounded-full py-2 px-8 text-xl sm:text-[32px] w-full font-[pretendard] font-light cursor-pointer"
          onClick={() =>
            (window.location.href = `https://${data?.result.brandUrl}`)
          }
        >
          공식 홈페이지 바로가기
        </button>
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
            <ReviewList perfumeId={perfumeId!} size={10} />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
