import { create } from "zustand";

interface ImgUploadState {
  file: File | null;
  previewUrl: string | null;
  setImg: (file: File) => void;
  reset: () => void;
}

export const useImgUploadStore = create<ImgUploadState>((set) => ({
  file: null,
  previewUrl: null,
  setImg: (file) => {
    const preview = URL.createObjectURL(file);
    set({ file, previewUrl: preview });
  },
  reset: () => set(({ previewUrl }) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    return { file: null, previewUrl: null };
  }),
}));

