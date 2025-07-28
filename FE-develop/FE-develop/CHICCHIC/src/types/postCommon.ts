// 페이지 정보
export type PageInfo = {
  pageNumber: number;
  pageSize: number;
};

// 게시글 목록 응답 Dto
export type ResponsePostListDto<T> = {
  content: T;
  pageable: PageInfo;
  totalElements: number;
  totalPages: number;
};

// 게시글 작성 요청
export type RequestCreatePostDto = {
  title: string;
  content: string;
  isSecret?: boolean;
};
