import type { ResponseProductCategoryDto } from "../types/perfumes";
import { axiosInstance } from "./axiosInstance";

// 향수 카테고리 조회
export const getPerfumeCategory = async (
  type?: string
): Promise<ResponseProductCategoryDto> => {
  try {
    console.log("요청 카테고리", type);
    const { data } = await axiosInstance.get<ResponseProductCategoryDto>(
      "/category",
      {
        params: type ? { type } : undefined,
      }
    );
    console.log("요청보냄");
    return data;
  } catch (e) {
    console.error("요청 실패", e);
    throw e;
  }
};

// 상품 상세정보 조회
export const getPerfumeDetail = async();
