import React from "react";
import { useNavigate } from "react-router-dom";

const mockData = {
  posts: [
    {
      id: "ancient-egypt",
      title: "신들의 향기, 고대 이집트에서 시작된",
      description: "향수의 역사",
      imageUrl: "/storyEgypt.png",
      imageAlt: "고대 이집트 향수",
    },
    {
      id: "perfume-vs-eau",
      title: "퍼퓸? 오드퍼퓸?",
      description: "향수 부향률 알아보기!",
      imageUrl: "/storyVase.png",
      imageAlt: "향수병",
    },
    {
      id: "perfume-longevity",
      title: "향수의 롱래스팅,",
      description: "무조건 지켜야할까?",
      imageUrl: "/storyLongevity.png",
      imageAlt: "향수 지속력",
    },
    {
      id: "perfume-notes",
      title: "향수의 3단계 Note,",
      description: "Top, Middle, Base Note",
      imageUrl: "/storyNote.png",
      imageAlt: "향수 노트",
    },
  ],
};

const PerfumeStory: React.FC = () => {
  const navigate = useNavigate();
  const handleCardClick = (postId: string): void => {
    navigate(`/community/story/${postId}`);
  };

  return (
    <div className="w-[70%] flex flex-col mx-auto my-8">
      <div className="text-center mb-8">
        <h1 className="text-[48px] font-bold text-[#AB3130] mb-2">
          Perfume Story
        </h1>
        <p className="text-[28px] text-[#AB3130]">
          향수에 얽힌 다양한 이야기들을 찾아보세요!
        </p>
        <hr className="w-[5%] border-[#AB3130] border-2 mx-auto mt-[3rem]" />
      </div>

      <div className="grid grid-cols-2 gap-6 mt-[2rem]">
        {mockData.posts.map((post) => {
          return (
            <div
              key={post.id}
              className={
                "rounded-2xl border-2 border-[#AB3130] overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
              }
              onClick={() => handleCardClick(post.id)}
            >
              <div className="h-[50vh] flex items-center justify-center">
                <img
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  className="w-[95%] h-[95%] object-cover rounded-2xl mt-[10px]"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
              </div>
              <div className="p-4">
                <p className="text-[28px] text-[#AB3130] leading-relaxed">
                  {post.title}
                  {post.description && (
                    <>
                      <br />
                      {post.description}
                    </>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <hr className="w-[5%] border-[#AB3130] border-2 mx-auto mt-[3rem]" />

      <div className="mt-8">
        <p className="text-[28px] text-[#AB3130] text-center">
          곧 더 많은 이야기들을 가지고 돌아올게요!
        </p>
      </div>
    </div>
  );
};

export default PerfumeStory;
