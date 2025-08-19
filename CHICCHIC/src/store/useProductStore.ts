import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface ProductState {
  perfumeId: number | null;
  setPerfumeId: (id: number) => void;
}

export const useProductStore = create<ProductState>()(
  // persist 미들웨어를 사용한 데이터 영속 저장
  persist(
    (set) => ({
      perfumeId: null,
      setPerfumeId: (id) => set({ perfumeId: id }),
    }),
    {
      name: LOCAL_STORAGE_KEY.perfumeIdStore,
    }
  )
);
