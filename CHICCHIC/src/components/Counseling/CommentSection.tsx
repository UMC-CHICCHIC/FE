import { useMemo } from "react";
import { useGetConsultComments } from "../../hooks/queries/useGetConsultComments";
import type { ConsultCommentGroup } from "../../types/post"; // ← 경로 조정
import { CommentItem } from "./CommentItem";
import { CommentFormat } from "./CommentFormat";

type Props = {
  consultPostId: number;
  onSubmitComment?: (payload: { content: string }) => Promise<void> | void;
  onSubmitReply?: (payload: {
    groupId: number;
    content: string;
  }) => Promise<void> | void;
};

export default function ConsultCommentsSection({
  consultPostId,
  onSubmitComment,
  onSubmitReply,
}: Props) {
  const { data, isLoading, isError } = useGetConsultComments(consultPostId);
  const content = data?.result?.content;
  const groups = useMemo<ConsultCommentGroup[]>(
    () => (Array.isArray(content) ? content : []),
    [content]
  );
  const totalCount = useMemo(
    () => groups.reduce((acc, g) => acc + 1 + (g.replies?.length ?? 0), 0),
    [groups]
  );

  if (isLoading) return <p className="pt-8">댓글을 불러오는 중…</p>;
  if (isError) return <p className="pt-8">댓글을 불러오지 못했습니다.</p>;

  return (
    <section className="pt-8">
      <p className="font-medium">댓글 {totalCount}</p>

      <div className="flex flex-col mt-6">
        {groups.length === 0 ? (
          <p className="py-8 text-gray-500">첫 번째 댓글을 남겨보세요.</p>
        ) : (
          groups.map((g) => (
            <div key={g.groupId} className="py-8 border-b">
              <CommentItem
                item={g.parent}
                level={0}
                groupId={g.groupId}
                replies={g.replies}
                onSubmitReply={onSubmitReply}
              />
            </div>
          ))
        )}
      </div>

      {/* 하단 댓글 입력창 */}
      <div className="mt-8">
        <CommentFormat
          placeholder="댓글 달기"
          onSubmit={async (content: string) => {
            if (!content.trim()) return;
            await onSubmitComment?.({ content });
          }}
        />
      </div>
    </section>
  );
}
