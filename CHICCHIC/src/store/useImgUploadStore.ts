import { create } from "zustand";

// 이미지 업로드 상태관리
interface ImgUploadState {
  url: string | null;
  key: string | null;
  setImg: (url: string, key: string) => void;
  reset: () => void;
}

export const useImgUpload = create<ImgUploadState>((set) => ({
  url: null,
  key: null,
  setImg: (url, key) => set({ url, key }),
  reset: () => set({ url: null, key: null }),
}));
