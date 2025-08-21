import React from 'react';
import { PerfumeGrid } from '../../components/PersonalPerfumeTest/perfume-grid';

// 퍼스널 퍼퓸 추천 상품 페이지
// API: GET /home/recommend-products
const RecommendProducts: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="bg-[#66191F] py-8">
        <div className="text-center py-16 text-white">
          <h1 className="text-5xl font-bold mb-4">Recommended For You</h1>
          <p className="text-xl opacity-90">퍼스널 테스트 기반 추천 향수</p>
        </div>
        <div className="container mx-auto px-4">
          <PerfumeGrid variant="detail" endpoint="/home/recommend-products" />
        </div>
      </main>
    </div>
  );
};

export default RecommendProducts;
