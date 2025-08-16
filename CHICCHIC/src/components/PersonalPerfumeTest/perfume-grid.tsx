import { useEffect, useState } from 'react';
import { PerfumeCard } from './perfume-card';
import { popularPerfumesMock } from '../../mocks/popularPerfumes';
import { axiosInstance } from '../../apis/axiosInstance';
import type { Perfume } from '../../types/perfumes';

// API 응답에 대한 타입 정의
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

export function PerfumeGrid() {
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopularPerfumes = async () => {
      try {
        // Mock 데이터를 사용할지 여부를 설정합니다.
        const useMock = false;
        if (useMock) {
          setPerfumes(popularPerfumesMock);
          return;
        }

  const { data } = await axiosInstance.get('/home/popular-products');

        // API 응답이 객체이고 result 속성에 배열이 담겨있습니다.
        const perfumeList: ApiPerfume[] = data.result;

        if (!Array.isArray(perfumeList)) {
          throw new Error('API 응답 형식이 올바르지 않습니다 (배열이 아님).');
        }

        // API 데이터를 PerfumeCard가 사용하는 Perfume 타입으로 변환
        const formattedPerfumes: Perfume[] = perfumeList.slice(0, 4).map((p) => ({
          id: p.id,
          name: p.name,
          brand: '브랜드 정보 없음', // API에 브랜드 정보가 없으므로 기본값 설정
          imageUrl: p.imageUrl, // API에서 제공하는 이미지 URL 사용
          description: `Middle: ${p.middleNote}, Base: ${p.baseNote}`,
          purchaseUrl: '#',
          notes: [p.middleNote, p.baseNote],
          price: p.price,
        }));

        setPerfumes(formattedPerfumes);
      } catch (e) {
        console.error('향수 정보를 불러오는 중 오류 발생:', e); // 콘솔에 에러 로그 추가
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPerfumes();
  }, []);

  if (isLoading) {
    // 스켈레톤 UI와 함께 로딩 메시지를 표시합니다.
    return (
      <div>
        <p className="mb-4 text-center text-gray-500">인기 상품을 불러오는 중입니다...</p>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="flex flex-col group">
              <div className="relative aspect-[4/5] w-full overflow-hidden mb-4 bg-gray-200 animate-pulse" />
              <div className="text-left">
                <div className="w-3/4 h-6 mb-1 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
                <div className="w-1/3 h-4 mt-1 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">오류: {error.message}</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      {perfumes.map((perfume) => (
        <PerfumeCard key={perfume.id} perfume={perfume} />
      ))}
    </div>
  );
}