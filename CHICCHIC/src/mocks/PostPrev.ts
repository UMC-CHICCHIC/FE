import { type Post, type PostPrev } from "../types/post";

// 추천함 포스트 데모
export const recommendPosts: Post[] = [
  {
    memberId: 123,
    nickname: "칙칙",
    consultId: 101,
    postType: "RECEIVE",
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
