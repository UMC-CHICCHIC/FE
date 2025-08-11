export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  notes: string[];
  price?: number; // price 속성을 선택적으로 추가
}