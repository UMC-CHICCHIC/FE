import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CounselingStore {
  consultPostId: number | null;
  setConsultPostId: (id: number) => void;
}

export const useCounselingStore = create<CounselingStore>()(
  persist(
    (set) => ({
      consultPostId: null,
      setConsultPostId: (id) => set({ consultPostId: id }),
    }),
    {
      name: LOCAL_STORAGE_KEY.conselingStore,
    }
  )
);
