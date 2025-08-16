import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import popularproducts from '../../assets/images/popularproducts.png';
import { axiosInstance } from '../../apis/axiosInstance';

interface TopNote {
  noteId: number;
  name: string;
}

interface ApiPerfume {
  id: number;
  name: string;
  topNote: TopNote[];
  baseNote: string;
  middleNote: string;
  price: number;
  itemRating: number;
  imageUrl: string;
}

const PopularPerfumeId: React.FC = () => {
  const [perfumes, setPerfumes] = useState<ApiPerfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopularPerfumes = async () => {
      try {
        const { data } = await axiosInstance.get('/home/popular-products');
        const perfumeList: ApiPerfume[] = data.result;

        if (!Array.isArray(perfumeList)) {
          throw new Error('API 응답 형식이 올바르지 않습니다 (배열이 아님).');
        }

        setPerfumes(perfumeList);
      } catch (e) {
        console.error('향수 정보를 불러오는 중 오류 발생:', e);
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPerfumes();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#66191F] flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">인기 상품을 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#66191F] flex items-center justify-center">
        <div className="text-white text-center">
          <p className="text-xl text-red-300">오류: {error.message}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      <main className="bg-[#66191F] py-8">
        {/* Title Section */}
        <div className="text-center py-16 text-white">
          <h1 className="text-5xl font-bold mb-4">Popular Products</h1>
          <p className="text-xl opacity-90">현재 가장 인기 있는 향수들을 둘러보세요.</p>
        </div>

        {/* 동적으로 생성된 제품 섹션들 */}
        {perfumes.map((perfume, index) => (
          <section key={perfume.id} className="mb-8">
            <div className="container mx-auto px-4">
              <div className="bg-[#F8F5F2] min-h-[70vh] flex">
                {/* 왼쪽 제품 이미지 */}
                <div className="w-1/2 flex items-center justify-center p-16">
                  <img
                    src={perfume.imageUrl || popularproducts}
                    alt={perfume.name}
                    className="w-[464px] h-[600px] object-contain"
                    onError={(e) => {
                      // 이미지 로드 실패 시 기본 이미지로 대체
                      (e.target as HTMLImageElement).src = popularproducts;
                    }}
                  />
                </div>
                
                {/* 오른쪽 제품 정보 */}
                <div className="w-1/2 p-16 flex flex-col justify-center text-[#AB3130]">
                  <div className="space-y-8">
                    {/* 제품 번호 */}
                    <div className="text-6xl font-bold opacity-80">{String(index + 1).padStart(2, '0')}</div>
                    <div className="w-16 h-0.5 bg-[#AB3130]"></div>
                    
                    {/* 제품명 */}
                    <div>
                      <h2 className="text-4xl font-bold mb-2">{perfume.name}</h2>
                      <p className="text-xl opacity-80">₩{perfume.price.toLocaleString()}</p>
                    </div>
                    
                    {/* 향수 노트 */}
                    <div className="space-y-2">
                      {perfume.topNote.length > 0 && (
                        <p className="text-lg">
                          <span className="font-semibold">Top: </span>
                          {perfume.topNote.map(note => note.name).join(', ')}
                        </p>
                      )}
                      {perfume.middleNote && (
                        <p className="text-lg">
                          <span className="font-semibold">Middle: </span>
                          {perfume.middleNote}
                        </p>
                      )}
                      {perfume.baseNote && (
                        <p className="text-lg">
                          <span className="font-semibold">Base: </span>
                          {perfume.baseNote}
                        </p>
                      )}
                    </div>
                    
                    {/* 평점 */}
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-semibold">평점:</span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-2xl ${
                              i < perfume.itemRating ? 'text-yellow-500' : 'text-gray-300'
                            }`}
                          >
                            ★
                          </span>
                        ))}
                        <span className="ml-2 text-lg">({perfume.itemRating}/5)</span>
                      </div>
                    </div>
                    
                    {/* 상세보기 버튼 */}
                    <div className="pt-4">
                      <Link
                        to={`/shopping/${perfume.id}`}
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
        ))}
      </main>
    </div>
  );
};

export default PopularPerfumeId;