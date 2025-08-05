import counselingMainImage from "/counselingHome.svg";
import RightArrow from "../../../assets/icons/arrowRight.svg";
import PostSection from "../../../components/Counseling/CounselingPostSection";
import { recommendedPosts, recommendPosts } from "../../../mocks/PostPrev";
import { useGetConsultPost } from "../../../hooks/queries/useGetConsultPost";

const PerfumeCounselingHome = () => {
  const { isLoading: isGiveLoading } = useGetConsultPost("GIVE");
  const { isLoading: isReceiveLoading } = useGetConsultPost("RECEIVE");
  return (
    <div className="bg-[#F7F4EF]">
      {/* 상단 배너 */}
      <section className="relative w-full h-[80vh] overflow-hidden">
        <img
          src={counselingMainImage}
          alt="background"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />
        <div className="pb-25 ml-20 font-[pretendard] relative z-10 flex flex-col items-start justify-end h-full px-4 text-white sm:px-8 md:px-20">
          <h1 className="mb-4 whitespace-pre-line leading-24 text-[clamp(2.25rem,4.75vw,3.75rem)] font-medium">
            향수 추천 상담소
          </h1>
          <p className="font-extralight text-[clamp(1.25rem,1.75vw,1.5rem)]">
            어떤 향수를 사야할지 고민된다면, 향수 추천 상담소에서 추천
            받아보세요!
          </p>
        </div>
      </section>

      {/* 콘텐츠 섹션 */}
      <section className="w-[90%] max-w-5xl font-[pretendard] mx-auto py-16">
        <div className="flex items-center justify-between">
          <span className="text-[#AB3130] font-semibold text-2xl mb-2">
            추천받아요! 최근 게시글
          </span>
          <a
            href="/community/recommendation/list"
            className="flex items-center justify-center gap-3 text-[#AB3130] text-sm sm:text-base"
          >
            더보기
            <img src={RightArrow} width={6} alt="rightArrow" />
          </a>
        </div>
        <PostSection
          posts={recommendedPosts}
          category="RECEIVE"
          isLoading={isReceiveLoading}
          isError
        />
        <span className="text-[#AB3130] font-semibold text-2xl mb-2">
          추천해요! 최근 게시글
        </span>

        <PostSection
          posts={recommendPosts}
          category="GIVE"
          isLoading={isGiveLoading}
          isError
        />
      </section>
    </div>
  );
};

export default PerfumeCounselingHome;
