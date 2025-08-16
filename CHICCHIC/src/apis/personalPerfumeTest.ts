import { axiosInstance } from "./axiosInstance";
import type {
  PerfumeTestAnswers,
  SavePerfumeTestAnswersDto,
} from "../types/personalPerfumeTest";

// 로그인 토큰 유효성 체크: 사용자 정보 API로 확인
export const checkAuthToken = async (): Promise<boolean> => {
  try {
    await axiosInstance.get("/member/info");
    return true;
  } catch {
    return false;
  }
};
// 과거 유저의 테스트 답변 조회
export const getPerfumeTestAnswers = async (): Promise<
  PerfumeTestAnswers | null
> => {
  const { data } = await axiosInstance.get<{
    result: PerfumeTestAnswers | null;
  }>("/perfume-test/answers");
  return data?.result ?? null;
};
// 테스트 답변 저장
export const savePerfumeTestAnswers = async (
  body: SavePerfumeTestAnswersDto
): Promise<{ success: boolean }> => {
  const { data } = await axiosInstance.post<{ success: boolean }>(
    "/perfume-test/answers",
    body
  );
  return { success: Boolean(data?.success) };
};
