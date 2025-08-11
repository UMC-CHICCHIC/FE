import { type ConsultPostPrev } from "../types/post";

// 추천함 prev 데모
export const recommendPostsPrev: ConsultPostPrev[] = [
  {
    consultPostId: 123,
    postType: "GIVE",
    title: "추천해요",
    content: "이런 향수를 추천해요",
    imageUrl: "/sample-image.png",
  },
  {
    consultPostId: 124,
    postType: "GIVE",
    title: "추천해요",
    content: "이런 향수를 추천해요",
    imageUrl: "/sample-image.png",
  },
];

// 추천받음 prev 데모
export const recommendedPostsPrev: ConsultPostPrev[] = [
  {
    consultPostId: 123,
    postType: "RECEIVE",
    title: "추천해요",
    content: "향수 추천 받고 싶어요!",
    imageUrl: "/sample-image.png",
  },
  {
    consultPostId: 124,
    postType: "RECEIVE",
    title: "추천해요",
    content: "향수 추천 받고 싶어요!",
    imageUrl: "/sample-image.png",
  },
];
