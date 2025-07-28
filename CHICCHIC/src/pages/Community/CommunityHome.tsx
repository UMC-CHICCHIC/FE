import CommunityMainImage from "/communityMain.svg";
import RightArrow from "../../assets/icons/arrowRight.svg";
import SamplePerfumeImg2 from "../../assets/images/samplePerfumeImg2.svg";
import { Link } from "react-router-dom";

const CommunityHome = () => {
  return (
    <>
      <section className="relative w-full pt-[136px] h-[80vh]">
        {/* 상단 배너 */}
        <img
          src={CommunityMainImage}
          alt="background"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />

        {/* 텍스트 레이어 */}
        <div className="relative flex flex-col items-start justify-start h-full px-4 pt-16 text-white z-5 sm:px-8 md:px-20">
          <span className="mb-10 whitespace-pre-line leading-14 text-[clamp(3rem,6vw,5rem)]">
            Perfume{"\n"}Community
          </span>
          <span className="max-w-2xl font-[pretendard] font-extralight whitespace-break-spaces text-[clamp(1rem,1.75vw,1.25rem)] leading-relaxed">
            향수 추천부터 향수에 대한 다양한 이야기, 그리고 향수를 기록하는 향수
            일기장까지.{"\n"}CHICCHIC의 커뮤니티에서 경험하세요.
          </span>
        </div>
      </section>
      {/* 향수 추천 상담소 섹션 */}
      <section className="bg-[#fdfaf7] font-[pretendard] py-20 px-6 sm:px-10 md:px-20">
        <span className="flex text-2xl sm:text-3xl font-medium text-[#AB3130] mb-4">
          향수 추천 상담소 최신글
        </span>
        <div className="flex justify-between mb-16 font-light">
          <span className="text-sm sm:text-base text-[#AB3130]">
            향수 추천하고 추천받으며 더 다양한 향수를 경험해보세요.
          </span>
          <a
            className="flex justify-center gap-3 text-sm sm:text-base text-[#AB3130]"
            href="/community/recommendation"
          >
            추천 상담소 바로가기
            <img src={RightArrow} width={6} alt="" />
          </a>
        </div>
        <div className="flex justify-around gap-4 mb-4">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-[#AB3130]" />
            <label className="font-light text-lg px-4 text-[#AB3130]">
              추천받아요!
            </label>
            <div className="flex-1 h-px bg-[#AB3130]" />
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-[#AB3130]" />
            <label className=" font-light text-lg px-4 text-[#AB3130]">
              추천해요!
            </label>
            <div className="flex-1 h-px bg-[#AB3130]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col justify-center border border-[#AB3130] h-64 rounded-md">
            <div className="flex p-8">
              <img
                src={SamplePerfumeImg2}
                width={120}
                className="mr-4"
                alt=""
              />
              <div className="flex flex-col gap-4 text-[#AB3130]">
                <p className="font-bold">제목</p>
                <p className="font-light">향수 추천 받고싶어요!</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="border rounded-full p-2 w-[200px] bg-[#AB3130] text-[#F7F4EF] cursor-pointer"
              >
                <Link to="/community/recommendation/list/:postId">
                  View Post
                </Link>
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center border border-[#AB3130] h-64 rounded-md">
            <div className="flex p-8">
              <img
                src={SamplePerfumeImg2}
                width={120}
                className="mr-4"
                alt=""
              />
              <div className="flex flex-col gap-4 text-[#AB3130]">
                <p className="font-bold">제목</p>
                <p className="font-light">향수 추천 받고싶어요!</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button className="border rounded-full p-2 w-[200px] cursor-pointer bg-[#AB3130] text-[#F7F4EF]">
                <Link to="/community/recommendation/list/:postId">
                  View Post
                </Link>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PerfumeStory 섹션 */}
      <section className="flex flex-col font-[pretendard] bg-[#fdfaf7] py-20 px-6 sm:px-10 md:px-20">
        <span className="text-5xl sm:text-5xl font-[crimsonText] text-[#AB3130] mb-2">
          Perfume Story
        </span>
        <div className="flex justify-between mb-8">
          <span className="text-sm sm:text-base font-light text-[#AB3130]">
            향수에 대한 다양한 이야기를 담았어요.
          </span>
          <a
            href="#"
            className="flex justify-center gap-3 text-sm sm:text-base font-light text-[#AB3130]"
          >
            향수 이야기에서 더 다양한 소식 확인하기
            <img src={RightArrow} width={6} alt="" />
          </a>
        </div>
        {/* 공백 카드 2x2 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-[#AB3130] h-40 rounded-xl flex items-end px-4 py-2 text-white text-sm"
              >
                제목
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default CommunityHome;
