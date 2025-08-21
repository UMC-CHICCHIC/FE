import CommunityMainImage from "/communityMain.svg";
import RightArrow from "../../assets/icons/arrowRight.svg";
import { useNavigate } from "react-router-dom";
import { perfumeStoryMock } from "../../mocks/perfumeStroyMock";
import { useGetConsultComHome } from "../../hooks/queries/useGetConsultPost";
import { useCounselingStore } from "../../store/useConsultPost";
import { usePostFilter } from "../../store/usePostFilter";

const CommunityHome = () => {
  const { setCategory } = usePostFilter();
  const { setConsultPostId } = useCounselingStore();
  const { data } = useGetConsultComHome();
  const navigate = useNavigate();

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
        <div className="relative flex flex-col items-start justify-start h-full gap-10 px-2 text-white z-5 sm:px-8 md:px-20">
          <span className="mb-10 whitespace-pre-line sm:leading-20 leading-12 text-[clamp(4rem,7vw,6rem)]">
            Perfume{"\n"}Community
          </span>
          <span className="max-w-5xl font-[pretendard] font-extralight break-keep text-[clamp(1.5rem,2.25vw,1.75rem)] leading-relaxed">
            향수 추천부터 향수에 대한 다양한 이야기, 그리고 향수를 기록하는 향수
            일기장까지.{"\n"}
            CHICCHIC의 커뮤니티에서 경험하세요.
          </span>
        </div>
      </section>
      {/* 향수 추천 상담소 섹션 */}
      <section className="bg-[#fdfaf7] font-[pretendard] py-20 px-6 sm:px-10 md:px-20">
        <span className="flex text-2xl sm:text-4xl font-medium text-[#AB3130] mb-4">
          향수 추천 상담소 최신글
        </span>
        <div className="flex flex-col justify-between font-light sm:mb-16 sm:flex-row">
          <span className="text-sm sm:text-xl text-[#AB3130]">
            향수 추천하고 추천받으며 더 다양한 향수를 경험해보세요.
          </span>
          <a
            className="flex justify-end gap-3 sm:p-0 p-4 text-sm sm:text-base text-[#AB3130] sm:justify-center cursor-pointer"
            onClick={() => navigate("/community/recommendation")}
          >
            추천 상담소 바로가기
            <img src={RightArrow} width={6} alt="" />
          </a>
        </div>
        <div className="flex justify-around gap-4 mb-4">
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-[#AB3130]" />
            <label className="font-light text-xl sm:px-8 px-2 text-[#AB3130]">
              추천받아요!
            </label>
            <div className="flex-1 h-px bg-[#AB3130]" />
          </div>
          <div className="flex items-center justify-center w-full">
            <div className="flex-1 h-px bg-[#AB3130]" />
            <label className=" font-light text-xl sm:px-8 px-2 text-[#AB3130]">
              추천해요!
            </label>
            <div className="flex-1 h-px bg-[#AB3130]" />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex flex-col justify-center border border-[#AB3130] h-64 rounded-md">
            <div className="flex p-8">
              {!data?.result.receivePost.imageUrl ? (
                <div className="flex justify-center items-center mr-4 w-[200px] h-[120px] bg-gray-300">
                  이미지가 없습니다.
                </div>
              ) : (
                <img
                  src={data?.result.receivePost.imageUrl}
                  className="mr-4 max-w-[178px] max-h-[172px]"
                  alt=""
                />
              )}

              <div className="flex flex-col text-xl gap-4 text-[#AB3130]">
                <p className="font-bold">{data?.result.receivePost.title}</p>
                <p className="font-light">{data?.result.receivePost.content}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="border rounded-full p-2 w-[200px] bg-[#AB3130] hover:bg-[#66191F] text-[#F7F4EF] transition-colors cursor-pointer"
                onClick={() => {
                  if (!data?.result.receivePost.consultPostId) return;
                  setConsultPostId(
                    data?.result.receivePost.consultPostId as number
                  );
                  setCategory("RECEIVE");
                  navigate(
                    `/community/recommendation/list/${data?.result.receivePost.consultPostId}`
                  );
                }}
              >
                View Post
              </button>
            </div>
          </div>
          <div className="flex flex-col justify-center border border-[#AB3130] h-64 rounded-md">
            <div className="flex p-8">
              {!data?.result.givePost.imageUrl ? (
                <div className="flex justify-center items-center mr-4 w-[178px] h-[120px] bg-gray-300">
                  이미지가 없습니다.
                </div>
              ) : (
                <img
                  src={data?.result.givePost.imageUrl}
                  className="mr-4 max-w-[178px] max-h-[172px]"
                  alt=""
                />
              )}
              <div className="flex flex-col gap-4 text-xl text-[#AB3130]">
                <p className="font-bold">{data?.result.givePost.title}</p>
                <p className="font-light">{data?.result.givePost.content}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                className="border rounded-full p-2 w-[200px] cursor-pointer bg-[#AB3130] hover:bg-[#66191F] transition-colors text-[#F7F4EF]"
                onClick={() => {
                  if (!data?.result.givePost.consultPostId) return;
                  setConsultPostId(
                    data?.result.givePost.consultPostId as number
                  );
                  setCategory("GIVE");
                  navigate(
                    `/community/recommendation/list/${data?.result.givePost.consultPostId}`
                  );
                }}
              >
                View Post
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
            onClick={() => navigate("/community/story")}
            className="flex justify-center gap-3 text-sm sm:text-base font-light text-[#AB3130] cursor-pointer"
          >
            향수 이야기에서 더 다양한 소식 확인하기
            <img src={RightArrow} width={6} alt="" />
          </a>
        </div>
        {/* 공백 카드 2x2 */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">
          {perfumeStoryMock.posts.map((post) => {
            return (
              <div
                key={post.id}
                className="flex-col bg-[#AB3130] rounded-xl flex px-4 py-2 cursor-pointer text-white text-xl items-center aspect-[16/10]"
                onClick={() => navigate(`/community/story/${post.id}`)}
              >
                <img
                  className="object-cover w-full h-full pt-8"
                  src={post.imageUrl}
                  alt={post.imageAlt}
                />
                <div className="flex flex-col sm:flex-row space-x-1.5 items-center text-center sm:py-8 py-2 sm:text-3xl text-2xl ">
                  <p>{post.title}</p>
                  <p>{post.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default CommunityHome;
