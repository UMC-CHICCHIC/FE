import { create } from "zustand";

interface CounselingStore {
  consultPostId: number | null;
  setConsultPostId: (id: number) => void;
}

export const useCounselingStore = create<CounselingStore>((set) => ({
  consultPostId: null,
  setConsultPostId: (id) => set({ consultPostId: id }),
}));
