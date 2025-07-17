import CommunityMainImage from "../../../public/communityMain.svg";

const CommunityHome = () => {
  return (
    <>
      <section className="relative w-full h-[60vh] overflow-hidden">
        {/* 배경 이미지 */}
        <img
          src={CommunityMainImage}
          alt="background"
          className="absolute inset-0 z-0 object-cover w-full h-full"
        />

        {/* 텍스트 레이어 */}
        <div className="relative flex flex-col items-start justify-start h-full px-4 pt-16 text-white z-5 sm:px-8 md:px-20">
          <h1 className="mb-10 whitespace-pre-line leading-14 text-[clamp(3rem,6vw,5rem)]">
            Perfume{"\n"}Community
          </h1>
          <p className="max-w-2xl font-[pretendard] font-extralight whitespace-break-spaces text-[clamp(1rem,1.75vw,1.25rem)] leading-relaxed">
            향수 추천부터 향수에 대한 다양한 이야기, 그리고 향수를 기록하는 향수
            일기장까지.{"\n"}CHICCHIC의 커뮤니티에서 경험하세요.
          </p>
        </div>
      </section>
      {/* 향수 추천 상담소 공백 섹션 */}
      <section className="bg-[#fdfaf7] py-20 px-6 sm:px-10 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#911E1E] mb-2">
          향수 추천 상담소 최신글
        </h2>
        <p className="text-sm sm:text-base text-[#911E1E] mb-8">
          향수 추천하고 추천받으며 더 다양한 향수를 경험해보세요.
        </p>
        {/* 공백 placeholder */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="border border-[#911E1E] h-48 rounded-md bg-white/50"></div>
          <div className="border border-[#911E1E] h-48 rounded-md bg-white/50"></div>
        </div>
      </section>

      {/* Perfume Story 공백 섹션 */}
      <section className="bg-[#fdfaf7] py-20 px-6 sm:px-10 md:px-20">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#911E1E] mb-2">
          Perfume Story
        </h2>
        <p className="text-sm sm:text-base text-[#911E1E] mb-8">
          향수에 대한 다양한 이야기를 담았어요.
        </p>
        {/* 공백 카드 2x2 */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
          {Array(4)
            .fill(0)
            .map((_, idx) => (
              <div
                key={idx}
                className="bg-[#911E1E] h-40 rounded-xl flex items-end px-4 py-2 text-white text-sm"
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
