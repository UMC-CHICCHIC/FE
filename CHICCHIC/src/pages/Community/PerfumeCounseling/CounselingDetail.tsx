import { usePostFilter } from "../../../store/usePostFilter";
import { POST_CATEGORY, type PostPrev } from "../../../types/post";

// 데모 포스트 양식
const recommendPosts: PostPrev[] = [
  {
    postId: 101,
    title: "추천해요",
    writer: "닉네임",
    createdAt: "2025.07.01.",
    image: "/sample-image.png",
  },
  {
    postId: 102,
    title: "제목제목제목제목",
    writer: "닉네임",
    createdAt: "2025.07.01.",
  },
];

// 데모 포스트 양식
const recommendedPosts: PostPrev[] = [
  {
    postId: 103,
    title: "추천 받아요",
    writer: "닉네임",
    createdAt: "2025.07.01.",
    image: "/sample-image.png",
  },
  {
    postId: 104,
    title: "제목제목제목제목",
    writer: "닉네임",
    createdAt: "2025.07.01.",
  },
];

const CounselingDetail = () => {
  // const [comment, setComment] = useState("");

  const { category } = usePostFilter();
  const select = POST_CATEGORY[category];

  return (
    <div className="text-xl max-w-6xl mx-auto text-[#AB3130]">
      <section>
        <div className="flex mt-6 text-[18px] py-16 font-medium space-x-2 max-w-100">
          <p className="flex flex-1 justify-center items-center border rounded-full px-6 py-4 text-white bg-[#AB3130] border-[#AB3130]">
            {select}
          </p>
        </div>
      </section>
      <section className="text-[#AB3130] font-[pretendard]">
        <span className="text-4xl font-medium">제목제목제목제목</span>
        <div className="flex border-b">
          <img src={"/profile.png"} alt="" />
          <div className="flex flex-col gap-2">
            <span>작성자 닉네임</span>
            <span>2025.07.01.</span>
          </div>
        </div>
        <div className="border-b">
          <img src="/sample-image.png" alt="" />
          <p>이 향수 이름은 뭔가요?</p>
        </div>
        <p>댓글 2</p>
        <div className="flex border-b">
          <img className="w-12 h-12" src={"/profile.png"} alt="" />
          <div className="flex flex-col gap-2">
            <p>닉네임</p>
            <p>댓글댓글</p>
            <p>댓글댓글</p>
            <div className="flex text-[#66191F] space-x-8 text-sm">
              <span>2025.07.01. 19:48</span>
              <button type="button" className="cursor-pointer">
                답글쓰기
              </button>
            </div>
            <input
              className="flex-1 p-2 border rounded-md"
              type="text"
              placeholder="답글답글"
            />
          </div>
        </div>
        <input
          className="flex-1 p-2 border rounded-md"
          type="text"
          placeholder="댓글 달기"
        />
      </section>
    </div>
  );
};

export default CounselingDetail;
