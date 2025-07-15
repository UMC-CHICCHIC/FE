export interface Perfume {
  id: number;
  name: string;
  brand: string;
  description: string;
  imageUrl: string;
  purchaseUrl: string;
  notes: string[];
}

export interface NavItem {
  path: string;
  label: string;
}