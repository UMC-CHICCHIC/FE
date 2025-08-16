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
