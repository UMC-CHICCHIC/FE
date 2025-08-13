import { create } from "zustand";

interface ProductState {
  perfumeId?: number;
  setPerfumeId: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  perfumeId: undefined,
  setPerfumeId: (id) => set({ perfumeId: id }),
}));
