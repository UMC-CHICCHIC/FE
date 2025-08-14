import { useState } from "react";
import { BsCardImage } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../apis/axiosInstance";
import { getAccessToken } from "../../utils/authStorage";

interface NewDiaryComponentProps {
  isPublic: boolean;
  onSubmitSuccess?: () => void;
}

const NewDiaryComponent = ({
  isPublic,
  onSubmitSuccess,
}: NewDiaryComponentProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = getAccessToken();
      if (!token) {
        alert("로그인이 필요합니다.");
        setIsSubmitting(false);
        return;
      }

      const formData = new FormData();

      // request 필드를 JSON 문자열로 추가
      formData.append(
        "request",
        JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          isPublic,
        })
      );

      // 이미지가 있을 때만 추가
      if (image) {
        formData.append("image", image);
      }

      const response = await axiosInstance.post("/diary", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Response:", response);

      alert("일기가 성공적으로 작성되었습니다!");
      setTitle("");
      setContent("");
      setImage(null);
      onSubmitSuccess?.();

      // 메인 일기 페이지로 이동
      navigate("/community/diary");
    } catch (error: any) {
      console.log("Error:", error.response?.status, error.response?.data);
      if (error.response?.status === 401) {
        alert("로그인이 만료되었습니다. 다시 로그인해주세요.");
      } else {
        alert(
          `작성에 실패했습니다. 상태: ${error.response?.status || "알 수 없음"}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* Title 입력 */}
      <label className="block text-[40px] font-bold mb-[15px]">Title</label>
      <section className="mb-[60px]">
        <input
          type="text"
          placeholder="제목을 작성해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-[129px] p-[15px] bg-transparent text-[28px] border border-[#AB3130] rounded-[15px] placeholder:text-[#AB3130] placeholder:text-[28px] focus:outline-none"
          disabled={isSubmitting}
        />
      </section>

      {/* Content 입력 */}
      <label className="block text-[40px] font-bold mb-[15px]">Content</label>
      <textarea
        placeholder="내용을 작성해주세요."
        rows={10}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-[15px] bg-transparent border border-[#AB3130] rounded-t-[15px] text-[28px] placeholder:text-[#AB3130] placeholder:text-[28px] focus:outline-none"
        disabled={isSubmitting}
      />

      <div className="w-full p-[15px] mt-[-5px] border border-[#AB3130] rounded-b-[15px] mb-[35px]">
        <label className="flex items-center gap-[8px] px-[30px] pb-4 font-semibold cursor-pointer">
          <BsCardImage className="w-[30px] h-[30px] text-[#AB3130]" />
          <span className="text-[#AB3130] text-[28px]">이미지 첨부하기</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={isSubmitting}
          />
        </label>
        {image && (
          <div className="mt-2">
            <p className="text-[#AB3130] text-[20px]">
              첨부된 이미지: {image.name}
            </p>
          </div>
        )}
      </div>

      {/* 작성 완료 버튼 */}
      <button
        className={`block mx-auto w-[50%] h-[82px] rounded-full bg-[#AB3130] text-white text-[28px] font-bold border-none cursor-pointer ${
          isSubmitting ? "opacity-50" : "hover:bg-[#992a29]"
        }`}
        onClick={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? "작성 중..." : "작성 완료하기"}
      </button>
    </div>
  );
};

export default NewDiaryComponent;
