import React from 'react';
import { Link } from 'react-router-dom';
import type { Perfume } from '../../types/perfumes';

const popularProducts: Perfume[] = [
  {
    id: 1,
    name: '도손',
    brand: 'Diptyque',
    description: 'A floral fragrance with tuberose, orange blossom, jasmine and amberwood.',
    imageUrl: 'https://placehold.co/300x400/f0f0f0/333?text=Perfume',
    purchaseUrl: '/shopping/product/1',
    notes: ['tuberose', 'orange blossom', 'jasmine', 'amberwood'],
  },
  {
    id: 2,
    name: '브랜드 향수 이름',
    brand: 'Brand Perfume name',
    description: 'notenotenotenotenotenotenote',
    imageUrl: 'https://placehold.co/300x400/f0f0f0/333?text=Perfume',
    purchaseUrl: '/shopping/product/2',
    notes: ['notenotenotenotenotenotenote'],
  },
  {
    id: 3,
    name: '브랜드 향수 이름',
    brand: 'Brand Perfume name',
    description: 'notenotenotenotenotenotenote',
    imageUrl: 'https://placehold.co/300x400/f0f0f0/333?text=Perfume',
    purchaseUrl: '/shopping/product/3',
    notes: ['notenotenotenotenotenotenote'],
  },
  {
    id: 4,
    name: '브랜드 향수 이름',
    brand: 'Brand Perfume name',
    description: 'notenotenotenotenotenotenote',
    imageUrl: 'https://placehold.co/300x400/f0f0f0/333?text=Perfume',
    purchaseUrl: '/shopping/product/4',
    notes: ['notenotenotenotenotenotenote'],
  },
  {
    id: 5,
    name: '브랜드 향수 이름',
    brand: 'Brand Perfume name',
    description: 'notenotenotenotenotenotenote',
    imageUrl: 'https://placehold.co/300x400/f0f0f0/333?text=Perfume',
    purchaseUrl: '/shopping/product/5',
    notes: ['notenotenotenotenotenotenote'],
  },
];

export default function PopularProductsList() {
  return (
    <div className="bg-[#66191F] min-h-screen">
      <header className="bg-transparent text-center w-full py-12">
        <h1 className="text-5xl font-semibold text-white">Popular Products</h1>
        <p className="text-white/80 mt-4">현재 가장 인기 있는 향수들을 둘러보세요.</p>
      </header>
      <main className="py-0">
        <div className="max-w-7xl mx-auto px-8">
          <div className="bg-[#F7F4EF] rounded-lg overflow-hidden border-2 border-[#66191F]">
            {popularProducts.map((product, idx) => (
              <div key={product.id} className={`flex ${idx !== 0 ? 'border-t-2 border-[#66191F]' : ''}`}>
                {/* 이미지 영역*/}
                <div className="w-1/3 flex items-center justify-center p-16 border-r-2 border-[#66191F] bg-white">
                  <img src={product.imageUrl} alt={product.name} className="max-w-full h-auto object-contain" />
                </div>
                {/* 내용 영역 */}
                <div className="w-2/3 flex flex-col justify-center p-16 bg-[#F7F4EF]">
                  <span className="text-7xl font-semibold text-[#AB3130] mb-2">{product.id.toString().padStart(2, '0')}</span>
                  <div className="h-px w-10 bg-[#AB3130] mb-4"></div>
                  <h3 className="text-4xl font-semibold text-[#AB3130] mb-2">{product.brand} {product.name}</h3>
                  <p className="text-2xl text-[#AB3130] mb-6">{product.notes.join(', ')}</p>
                  <Link
                    to={product.purchaseUrl}
                    className="inline-block self-start px-8 py-3 border border-[#AB3130] rounded-full text-lg text-[#AB3130] hover:bg-[#AB3130] hover:text-white transition-colors"
                  >
                    상세 페이지 이동
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
