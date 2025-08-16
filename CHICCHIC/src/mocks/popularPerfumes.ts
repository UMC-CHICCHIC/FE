import type { Perfume } from "../types/perfumes";

// 제공된 JSON을 Perfume 타입으로 변환한 목데이터 (상위 4개)
export const popularPerfumesMock: Perfume[] = [
  {
    id: 1,
    name: " Million Lucky",
    brand: "브랜드 정보 없음",
    description: "노트: Oakmos, Hazelnut, Jasmine",
    imageUrl: "https://static.luckyscent.com/images/products/37401.jpg?width=400&404=product.png",
    purchaseUrl: "#",
    notes: [
      "Oakmos, Hazelnut, Jasmine"
    ],
    price: 330750,
  },
  {
    id: 20 ,
    name: "Quatre",
    brand: "브랜드 정보 없음",
    description: "노트: Golden Woods Musk, ambac Jasmine Absolute, Rose Absolute",
    imageUrl: "https://static.luckyscent.com/images/products/702055.jpg?width=400&404=product.png",
    purchaseUrl: "#",
    notes: [
      "Golden Woods Musk, ambac Jasmine Absolute, Rose Absolute"
    ],
    price: 232200,
  },
  {
    id: 420,
    name: "L.12.12 Rouge",
    brand: "브랜드 정보 없음",
    description: "노트: Rooibos Tea Extract (red Bush Tea), Acacia Wood",
    imageUrl: "https://placehold.co/400x500.png",
    purchaseUrl: "#",
    notes: [
      "Rooibos Tea Extract (red Bush Tea)",
      "Acacia Wood",
    ],
    price: 152550,
  },
  {
    id: 669,
    name: "Lancy",
    brand: "브랜드 정보 없음",
    description: "노트: Iris, Orange Blossom, Jasmine, Tonka, Praline, Patchouli, Vanilla",
    imageUrl: "https://placehold.co/400x500.png",
    purchaseUrl: "#",
    notes: [
      "Iris, Orange Blossom, Jasmine",
      "Tonka, Praline, Patchouli, Vanilla",
    ],
    price: 16200,
  },
];
