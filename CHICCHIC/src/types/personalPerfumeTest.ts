export interface PerfumeTestAnswerItem {
  questionId: number;
  answer: string;
}

export interface PerfumeTestAnswers {
  userId: number;
  answers: PerfumeTestAnswerItem[];
  createdAt: string; // ISO string
}

export interface SavePerfumeTestAnswersDto {
  answers: PerfumeTestAnswerItem[];
}

// --- New: Recommendation API types ---
export interface RecommendationAnswerItem {
  questionId: number;
  optionId: number;
}

export interface RecommendationRequestDto {
  answers: RecommendationAnswerItem[];
}

export interface RecommendationItem {
  productId: number;
  perfumeName: string;
  recommendedNotes: string[];
}

export interface RecommendationResponseDto {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RecommendationItem[];
}
