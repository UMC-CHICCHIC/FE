import { useState } from "react";
import type { Consult } from "../../types/post";
import { DateTimeFormat, HoursTimeFormat } from "../../utils/dateTimeFormat"; // ← 경로 조정
import { ReplyFormat } from "./ReplyFormat";
import { useImgUploadStore } from "../../store/useProfileImg";
import { ReplyItem } from "./ReplyItem";

type Props = {
  item: Consult; // 답글 데이터
  level?: 0 | 1; // 답글 / 댓글
  groupId?: number; // 댓글 목록
  replies?: Consult[]; // 답글 목록
  onSubmitReply?: (payload: {
    groupId: number;
    content: string;
  }) => Promise<void> | void;
};

export function CommentItem({
  item,
  level = 0,
  groupId,
  replies = [],
  onSubmitReply,
}: Props) {
  const isParent = level === 0;
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const preiviewUrl = useImgUploadStore((s) => s.previewUrl);
  const avartar = preiviewUrl ?? "/profileImg.png";

  const avatarSize = isParent ? "w-12 h-12" : "w-10 h-10";
  const containerIndent = isParent ? "" : "ml-5";
  const nameRowText = isParent ? "font-medium" : "text-sm text-gray-600";

  return (
    <div className={`flex ${containerIndent}`}>
      <img className={avatarSize} src={avartar} alt="profile" />
      <div className="flex flex-col w-full pl-6 sm:pl-10">
        {/* 작성자/시간 */}
        <div className={`flex items-center gap-2 ${nameRowText}`}>
          <span className={isParent ? "font-medium" : "font-medium"}>
            {item.nickname}
          </span>
          <span className={!isParent ? "" : "hidden"}>·</span>
          <time
            className={!isParent ? "text-gray-500" : "text-[#66191F] text-sm"}
          ></time>
        </div>

        {/* 내용 */}
        <p
          className={`mt-1 ${
            isParent ? "py-4" : "mt-1"
          } whitespace-pre-wrap leading-relaxed`}
        >
          {item.content}
        </p>

        {/* 액션 영역(부모 전용) */}
        {isParent && (
          <div className="text-[#66191F] space-x-8 text-sm pb-2">
            <span>
              {DateTimeFormat(item.dateTime)} {HoursTimeFormat(item.dateTime)}
            </span>
            <button
              type="button"
              className="cursor-pointer hover:underline"
              onClick={() => setIsReplyOpen((v) => !v)}
            >
              {isReplyOpen ? "답글닫기" : "답글쓰기"}
            </button>
          </div>
        )}

        {/* 답글 입력창 */}
        {isParent && isReplyOpen && (
          <div className="mt-3">
            <ReplyFormat
              placeholder="답글 쓰기"
              onSubmit={async (content: string) => {
                if (!content.trim() || !groupId) return;
                await onSubmitReply?.({ groupId, content });
              }}
            />
          </div>
        )}

        {/* 답글 렌더링 */}
        {isParent && replies?.length > 0 && (
          <div className="flex flex-col gap-4 mt-4">
            {replies.map((child, idx) => (
              <ReplyItem key={`${groupId}-${idx}`} item={child} level={1} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
