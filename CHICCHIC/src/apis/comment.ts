import type {
  RequestConsultCommentDto,
  ResponseConsultCommentsDto,
  ResponseConsultReplyDto,
} from "../types/post";
import { axiosInstance } from "./axiosInstance";

// 댓글 가져오기
export const getConsultComments = async (
  consultPostId: number
): Promise<ResponseConsultCommentsDto> => {
  const { data } = await axiosInstance.get<ResponseConsultCommentsDto>(
    `/consult-posts/${consultPostId}/comments`
  );
  return data;
};

// 댓글 등록
export const createConsultComment = async (
  consultPostId: number,
  body: RequestConsultCommentDto
): Promise<ResponseConsultReplyDto> => {
  const { data } = await axiosInstance.post<ResponseConsultReplyDto>(
    `/consult-posts/${consultPostId}/comments`,
    body
  );
  return data;
};

// 대댓글 등록
export const createConsultReply = async (
  consultPostId: number,
  groupId: number,
  body: RequestConsultCommentDto
): Promise<ResponseConsultReplyDto> => {
  const { data } = await axiosInstance.post<ResponseConsultReplyDto>(
    `/consult-posts/${consultPostId}/comments/${groupId}/replies`,
    body
  );
  return data;
};
