import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostFilter } from "../../../store/usePostFilter";
import {
  POST_CATEGORY,
  type DiaryPost,
  type DiaryComment,
} from "../../../types/post";
import {
  getDiaryDetail,
  createDiaryComment,
  getDiaryComments,
} from "../../../apis/posts";
import arrowUp from "../../../assets/icons/arrowUp.svg";

const DiaryDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const { category } = usePostFilter();
  const select = POST_CATEGORY[category];
  const [openReply, setOpenReply] = useState<{ [key: number]: boolean }>({});
  const [replyContent, setReplyContent] = useState<{ [key: number]: string }>(
    {}
  );
  const [diaryData, setDiaryData] = useState<DiaryPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [comments, setComments] = useState<DiaryComment[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}.${month}.${day} ${hours}:${minutes}`;
  };

  const fetchComments = async () => {
    if (!postId) return;

    try {
      setCommentsLoading(true);
      const response = await getDiaryComments(Number(postId));

      // 댓글과 답글을 구분하여 구조화
      const parentComments = response.result.filter(
        (comment) => !comment.parentCommentId
      );
      const replies = response.result.filter(
        (comment) => comment.parentCommentId
      );

      // 부모 댓글에 답글 연결
      const commentsWithReplies = parentComments.map((parent) => ({
        ...parent,
        replies: replies.filter(
          (reply) => reply.parentCommentId === parent.commentId
        ),
      }));

      setComments(commentsWithReplies);
    } catch (err) {
      console.error("댓글 목록 조회 실패:", err);
    } finally {
      setCommentsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      if (!postId) return;

      try {
        setLoading(true);
        const response = await getDiaryDetail(Number(postId));
        setDiaryData(response.result);
      } catch (err) {
        console.error("일기 상세 조회 실패:", err);
        setError("일기를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDiaryDetail();
    fetchComments();
  }, [postId]);

  const handleReplyClick = (commentId: number) => {
    setOpenReply((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleReplySubmit = async (parentCommentId: number) => {
    const content = replyContent[parentCommentId];
    if (!content?.trim() || !postId || commentLoading) return;

    try {
      setCommentLoading(true);
      await createDiaryComment(Number(postId), {
        content: content.trim(),
        parentCommentId,
      });
      setReplyContent((prev) => ({ ...prev, [parentCommentId]: "" }));
      setOpenReply((prev) => ({ ...prev, [parentCommentId]: false }));
      await fetchComments();
    } catch (err) {
      console.error("답글 작성 실패:", err);
      alert("답글 작성에 실패했습니다.");
    } finally {
      setCommentLoading(false);
    }
  };

  const handleReplyContentChange = (commentId: number, value: string) => {
    setReplyContent((prev) => ({ ...prev, [commentId]: value }));
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim() || !postId || commentLoading) return;

    try {
      setCommentLoading(true);
      await createDiaryComment(Number(postId), { content: comment });
      setComment("");
      // 댓글 작성 후 댓글 목록 새로고침
      await fetchComments();
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      alert("댓글 작성에 실패했습니다.");
    } finally {
      setCommentLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl px-4 sm:text-xl mx-auto text-[#AB3130] font-[pretendard] flex justify-center items-center min-h-screen">
        <div>로딩 중...</div>
      </div>
    );
  }

  if (error || !diaryData) {
    return (
      <div className="max-w-6xl px-4 sm:text-xl mx-auto text-[#AB3130] font-[pretendard] flex justify-center items-center min-h-screen">
        <div>{error || "일기를 찾을 수 없습니다."}</div>
      </div>
    );
  }

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
          {diaryData.title}
        </span>
        <div className="flex py-8 border-b">
          <img className="max-w-20 max-h-20" src="/profile.png" alt="profile" />
          <div className="flex flex-col items-center justify-center gap-2 pl-4">
            <span>{diaryData.nickName}</span>
            <span>{diaryData.createdAt}</span>
          </div>
        </div>
        <div className="pt-6 border-b">
          {diaryData.imageUrl && <img src={diaryData.imageUrl} alt="" />}
          <p className="pt-8 pb-20">{diaryData.content}</p>
        </div>
        {/* 댓글란 */}
        <section>
          <p className="pt-8 font-medium">
            댓글{" "}
            {comments.reduce(
              (total, comment) => total + 1 + (comment.replies?.length || 0),
              0
            )}
          </p>
          {commentsLoading ? (
            <div className="py-8">댓글을 불러오는 중...</div>
          ) : comments.length > 0 ? (
            comments.map((commentItem) => (
              <div key={commentItem.commentId} className="flex py-8 border-b">
                <img className="w-12 h-12 rounded-full object-cover" src={commentItem.profileImageUrl || "/profile.png"} alt="" />
                <div className="flex flex-col w-full pl-10">
                  <p>{commentItem.nickName}</p>
                  <p className="py-4">{commentItem.content}</p>
                  <div className="text-[#66191F] space-x-8 text-sm pb-2">
                    <span>{formatDateTime(commentItem.createdAt)}</span>
                    <button
                      type="button"
                      className="cursor-pointer hover:underline"
                      onClick={() => handleReplyClick(commentItem.commentId)}
                    >
                      {openReply[commentItem.commentId]
                        ? "답글닫기"
                        : "답글쓰기"}
                    </button>
                  </div>
                  {openReply[commentItem.commentId] && (
                    <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent mt-2">
                      <input
                        type="text"
                        placeholder="답글 쓰기"
                        className="flex-1 px-4 bg-transparent sm:p-4 focus:outline-none"
                        value={replyContent[commentItem.commentId] || ""}
                        onChange={(e) =>
                          handleReplyContentChange(
                            commentItem.commentId,
                            e.target.value
                          )
                        }
                        disabled={commentLoading}
                      />
                      <button
                        className="p-2 pr-3"
                        onClick={() => handleReplySubmit(commentItem.commentId)}
                        disabled={
                          commentLoading ||
                          !replyContent[commentItem.commentId]?.trim()
                        }
                      >
                        <img
                          className={`border rounded-full p-1 w-full ${
                            commentLoading ||
                            !replyContent[commentItem.commentId]?.trim()
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#AB3130] cursor-pointer hover:bg-[#872b2b]"
                          }`}
                          src={arrowUp}
                          alt="arrowUp"
                          width={35}
                        />
                      </button>
                    </div>
                  )}

                  {/* 답글 표시 */}
                  {commentItem.replies && commentItem.replies.length > 0 && (
                    <div className="ml-8 mt-4 space-y-4">
                      {commentItem.replies.map((reply) => (
                        <div key={reply.commentId} className="flex py-4 pl-4">
                          <img
                            className="w-10 h-10 rounded-full object-cover"
                            src={reply.profileImageUrl || "/profile.png"}
                            alt=""
                          />
                          <div className="flex flex-col w-full pl-6">
                            <p>{reply.nickName}</p>
                            <p className="py-4">{reply.content}</p>
                            <div className="text-[#66191F] space-x-8 text-sm pb-2">
                              <span>{formatDateTime(reply.createdAt)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-8 text-gray-500">아직 댓글이 없습니다.</div>
          )}
        </section>
        {/* 댓글 입력창 */}
        <div className="flex items-center border border-[#AB3130] rounded-xl bg-transparent my-15">
          <input
            className="flex-1 p-4 focus:outline-none"
            type="text"
            placeholder="댓글 달기"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            disabled={commentLoading}
          />
          <button
            className="p-2 pr-3"
            onClick={handleCommentSubmit}
            disabled={commentLoading || !comment.trim()}
          >
            <img
              className={`border rounded-full p-1 w-full ${
                commentLoading || !comment.trim()
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#AB3130] cursor-pointer hover:bg-[#872b2b]"
              }`}
              src={arrowUp}
              alt="arrowUp"
              width={35}
            />
          </button>
        </div>
      </section>
    </div>
  );
};

export default DiaryDetail;
