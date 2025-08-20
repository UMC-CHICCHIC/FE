import { axiosInstance } from "./axiosInstance";
import type {
  RecommendationRequestDto,
  RecommendationResponseDto,
  HomeRecommendItem,
  HomeRecommendResponse,
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

export const getPerfumeRecommendations = async (
  body: RecommendationRequestDto
): Promise<RecommendationResponseDto> => {
  console.log("새 테스트 실행:", body);
  const { data } = await axiosInstance.post<RecommendationResponseDto>(
  "/test",
    body
  );
  console.log("새 테스트 응답:", data);
  return data;
};

export const getHomeRecommendProducts = async (): Promise<HomeRecommendItem[]> => {
  try {
    const { data } = await axiosInstance.get<HomeRecommendResponse>(
      "/home/recommend-products"
    );
    
    console.log("추천 상품 응답:", data);
    
    if (data?.isSuccess && data.result) {
      return data.result;
    }
    
    return [];
  } catch (error) {
    console.error("추천 상품 조회 실패:", error);
    return [];
  }
};

export const hasUserRecommendations = async (): Promise<boolean> => {
  try {
    const recommendations = await getHomeRecommendProducts();
    return recommendations.length > 0;
  } catch {
    return false;
  }
};
