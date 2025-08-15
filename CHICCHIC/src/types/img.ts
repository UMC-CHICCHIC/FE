import type { CommonResponse } from "./common";

export type Image = {
  url: string;
  key: string;
};

export type ResponseUploadImg = CommonResponse<Image>;

export type RequestImgDto = {
  file: File;
};
