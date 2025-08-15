import { create } from "zustand";

interface ProductState {
  perfumeId: number | null;
  setPerfumeId: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  perfumeId: null,
  setPerfumeId: (id) => set({ perfumeId: id }),
}));
