import React from 'react';
import { Link } from 'react-router-dom';
import popularproducts from '../../assets/images/popularproducts.png';

const PopularPerfumeId: React.FC = () => {
  return (
    <div className="min-h-screen">
      
      <main className="bg-[#66191F] py-8">
        {/* Hero Section with Product Details */}
        {/* Title Section */}
        <div className="text-center py-16 text-white">
          <h1 className="text-5xl font-bold mb-4">Popular Products</h1>
          <p className="text-xl opacity-90">현재 가장 인기 있는 향수들을 둘러보세요.</p>
        </div>

        {/* 01 Diptyque Doson */}
        <section className="mb-8">
          {/* 메인 제품 영역 */}
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              {/* 왼쪽 제품 이미지 */}
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={popularproducts}
                  alt="Diptyque Doson"
                  className="w-[464px] h-[600px] object-contain"
                />
              </div>
              
              {/* 오른쪽 제품 정보 */}
              <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                <div className="space-y-8">
                  {/* 제품 번호 */}
                  <div className="text-6xl font-bold opacity-80">01</div>
                  <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                  
                  {/* 제품명 */}
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Diptyque Doson</h2>
                    <p className="text-xl opacity-80">딥티크 도손</p>
                  </div>
                  
                  {/* 향수 노트 */}
                  <div className="space-y-2">
                    <p className="text-lg">tuberose, orange blossom, jasmine and amberwood</p>
                  </div>
                  
                  {/* 상세보기 버튼 */}
                  <div className="pt-4">
                    <Link
                      to="/shopping/:perfumeId"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#AB3130] text-[#AB3130] font-semibold hover:bg-[#AB3130] hover:text-white transition-colors duration-300 rounded-md"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 02 Tom Ford */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={popularproducts}
                  alt="Tom Ford Oud Wood"
                  className="w-[464px] h-[600px] object-contain"
                />
              </div>
              
              <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                <div className="space-y-8">
                  <div className="text-6xl font-bold opacity-80">02</div>
                  <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                  
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Tom Ford Oud Wood</h2>
                    <p className="text-xl opacity-80">톰 포드 우드</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg">rosewood, cardamom, oud wood</p>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      to="/ProductDetail"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#AB3130] text-[#AB3130] font-semibold hover:bg-[#AB3130] hover:text-white transition-colors duration-300 rounded-md"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 03 Chanel */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={popularproducts}
                  alt="Chanel No.5"
                  className="w-[464px] h-[600px] object-contain"
                />
              </div>
              
              <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                <div className="space-y-8">
                  <div className="text-6xl font-bold opacity-80">03</div>
                  <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                  
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Chanel No.5</h2>
                    <p className="text-xl opacity-80">샤넬 N°5</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg">ylang-ylang, rose, jasmine</p>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      to="/ProductDetail"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#AB3130] text-[#AB3130] font-semibold hover:bg-[#AB3130] hover:text-white transition-colors duration-300 rounded-md"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 04 Maison Margiela */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={popularproducts}
                  alt="Maison Margiela REPLICA"
                  className="w-[464px] h-[600px] object-contain"
                />
              </div>
              
              <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                <div className="space-y-8">
                  <div className="text-6xl font-bold opacity-80">04</div>
                  <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                  
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Maison Margiela REPLICA</h2>
                    <p className="text-xl opacity-80">메종 마르지엘라 레플리카</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg">beach walk, coconut milk, bergamot</p>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      to="/ProductDetail"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#AB3130] text-[#AB3130] font-semibold hover:bg-[#AB3130] hover:text-white transition-colors duration-300 rounded-md"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 05 Jo Malone */}
        <section className="mb-8">
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={popularproducts}
                  alt="Jo Malone Lime Basil"
                  className="w-[464px] h-[600px] object-contain"
                />
              </div>
              
              <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                <div className="space-y-8">
                  <div className="text-6xl font-bold opacity-80">05</div>
                  <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                  
                  <div>
                    <h2 className="text-4xl font-bold mb-2">Jo Malone Lime Basil</h2>
                    <p className="text-xl opacity-80">조 말론 라임 바질</p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-lg">lime, basil, thyme, mandarin</p>
                  </div>
                  
                  <div className="pt-4">
                    <Link
                      to="/ProductDetail"
                      className="inline-flex items-center justify-center px-8 py-3 border-2 border-[#AB3130] text-[#AB3130] font-semibold hover:bg-[#AB3130] hover:text-white transition-colors duration-300 rounded-md"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default PopularPerfumeId;