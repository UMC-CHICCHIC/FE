import React from 'react';
import { PerfumeGrid } from '../../components/PersonalPerfumeTest/perfume-grid';

const PopularPerfumeId: React.FC = () => {
  return (
    <div className="min-h-screen">
      <main className="bg-[#66191F] py-8">
        {/* Title Section */}
        <div className="text-center py-16 text-white">
          <h1 className="text-5xl font-bold mb-4">Popular Products</h1>
          <p className="text-xl opacity-90">현재 가장 인기 있는 향수들을 둘러보세요.</p>
        </div>

        {/* 제품 그리드 */}
        <div className="container mx-auto px-4">
          <PerfumeGrid variant="detail" />
        </div>
      </main>
    </div>
  );
};

export default PopularPerfumeId;