import { create } from "zustand";
import type { PostCategory } from "../types/post";

// 상담소 카테고리 필터링 구현
interface PostFilterState {
  category: PostCategory;
  setCategory: (c: PostCategory) => void;
}

export const usePostFilter = create<PostFilterState>((set) => ({
  category: "RECOMMEND",
  setCategory: (c) => set({ category: c }),
}));
