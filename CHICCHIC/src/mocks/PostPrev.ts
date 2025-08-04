import { type Post, type PostPrev } from "../types/post";

// 추천함 포스트 데모
export const recommendPosts: Post[] = [
  {
    memberId: 123,
    nickname: "칙칙",
    consultId: 101,
    postType: "GIVE",
    title: "추천해요",
    imageUrl: "/sample-image.png",
    dateTime: "2025.07.01.",
  },
  {
    memberId: 124,
    nickname: "닉네임",
    consultId: 102,
    postType: "GIVE",
    title: "제목제목제목제목",
    dateTime: "2025.07.01.",
  },
];

// 추천받음 포스트 데모
export const recommendedPosts: Post[] = [
  {
    memberId: 123,
    nickname: "칙칙",
    consultId: 101,
    postType: "RECEIVE",
    title: "추천받아요",
    imageUrl: "/sample-image.png",
    dateTime: "2025.07.01.",
  },
  {
    memberId: 124,
    nickname: "닉네임",
    consultId: 102,
    postType: "RECEIVE",
    title: "제목제목제목제목",
    dateTime: "2025.07.01.",
  },
];

// 추천함 prev 데모
export const recommendPostsPrev: PostPrev[] = [
  {
    consultId: 123,
    postType: "GIVE",
    title: "추천해요",
    content: "이런 향수를 추천해요",
    imageUrl: "/sample-image.png",
  },
  {
    consultId: 124,
    postType: "GIVE",
    title: "추천해요",
    content: "이런 향수를 추천해요",
    imageUrl: "/sample-image.png",
  },
];

// 추천받음 prev 데모
export const recommendedPostsPrev: PostPrev[] = [
  {
    consultId: 123,
    postType: "RECEIVE",
    title: "추천해요",
    content: "향수 추천 받고 싶어요!",
    imageUrl: "/sample-image.png",
  },
  {
    consultId: 124,
    postType: "RECEIVE",
    title: "추천해요",
    content: "향수 추천 받고 싶어요!",
    imageUrl: "/sample-image.png",
  },
];
