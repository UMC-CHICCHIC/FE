import { usePostFilter } from "../../../store/usePostFilter";
import { POST_CATEGORY } from "../../../types/post";
import { useGetConsultDetail } from "../../../hooks/queries/useGetConsultPost";
import { useCounselingStore } from "../../../store/useConsultPost";
import { DateTimeFormat } from "../../../utils/dateTimeFormat";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateConsultComment } from "../../../hooks/mutations/useCreateComment";
import ConsultCommentsSection from "../../../components/Counseling/CommentSection";
import { QUERY_KEY } from "../../../constants/key";
import { createConsultReply } from "../../../apis/comment";
import { useImgUploadStore } from "../../../store/useProfileImg";

const CounselingDetail = () => {
  const { category } = usePostFilter();
  const select = POST_CATEGORY[category];
  const { consultPostId } = useCounselingStore();
  const { data } = useGetConsultDetail(consultPostId!);
  const qc = useQueryClient();
  const createComment = useCreateConsultComment(consultPostId!);
  const preivewUrl = useImgUploadStore((s) => s.previewUrl);

  return (
    <div className="max-w-6xl px-4 sm:text-xl mx-auto text-[#AB3130] font-[pretendard]">
      {/* 카테고리 표시 */}
      <section className="flex mt-8 sm:text-[18px] sm:pb-12 pb-12 font-medium space-x-2 max-w-50">
        <p className="flex flex-1 justify-center items-center border rounded-full px-4 py-3 sm:px-6 sm:py-4 text-white bg-[#AB3130] border-[#AB3130]">
          {select}
        </p>
      </section>
      {/* 작성 게시물 상세정보 */}
      <section>
        <span className="text-2xl font-medium sm:text-4xl ">
          {data?.result.title}
        </span>
        <div className="flex py-8 border-b">
          <img
            className="w-20 h-20 rounded-full"
            src={preivewUrl ?? "/profile.png"}
            alt="profile"
          />
          <div className="flex flex-col items-start justify-center gap-2 pl-4">
            <span>{data?.result.nickname}</span>
            <span>{DateTimeFormat(data?.result.dateTime as string)}</span>
          </div>
        </div>
        <div className="pt-6 border-b">
          {data?.result.imageUrl && (
            <img
              src={data.result.imageUrl}
              alt="uploadedImg"
              className="max-w-[344px] max-h-[269px]"
            />
          )}
          <p className="pt-8 pb-20">{data?.result.content}</p>
        </div>
      </section>
      {/* 댓글란 */}
      <ConsultCommentsSection
        consultPostId={consultPostId!}
        onSubmitComment={({ content }) => createComment.mutate({ content })}
        onSubmitReply={async ({ groupId, content }) => {
          await createConsultReply(consultPostId!, groupId, { content });
          await qc.invalidateQueries({
            queryKey: [QUERY_KEY.consultComments, consultPostId],
          });
        }}
      />
    </div>
  );
};

export default CounselingDetail;
