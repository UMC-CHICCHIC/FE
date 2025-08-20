import { useEffect, useState } from 'react';
import { PerfumeCard } from './perfume-card';
import { popularPerfumesMock } from '../../mocks/popularPerfumes';
import { axiosInstance } from '../../apis/axiosInstance';
import { getAccessToken } from '../../utils/authStorage';
import type { Perfume } from '../../types/perfumes';
import { Link } from 'react-router-dom';
import popularproducts from '../../assets/images/mainpage.png';

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
  brand?: string;
  // recommend-products 응답 호환을 위해 추가
  productId?: number;
}

interface ApiResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  result: ApiPerfume[];
}

// 통합 컴포넌트 Props: variant로 레이아웃 선택
interface PerfumeGridProps {
  variant?: 'grid' | 'detail';
  limit?: number; // grid에서 보여줄 개수 제한
  endpoint?: string; // 호출할 API 경로 (기본: 인기상품)
}

export function PerfumeGrid({ variant = 'grid', limit = 4, endpoint = '/home/popular-products' }: PerfumeGridProps) {
  const [perfumes, setPerfumes] = useState<ApiPerfume[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPopularPerfumes = async () => {
      try {
  console.info("[PerfumeGrid] fetch start", { endpoint });
        const useMock = false;
        if (useMock) {
          // mock을 ApiPerfume 형태로 간단 변환
          const mocked: ApiPerfume[] = popularPerfumesMock.map((p) => ({
            id: p.id,
            name: p.name,
            brand: p.brand,
            imageUrl: p.imageUrl,
            price: p.price ?? 0,
            baseNote: p.notes?.[1] ?? '',
            middleNote: p.notes?.[0] ?? '',
            itemRating: 5,
            topNote: [],
          }));
          setPerfumes(mocked);
          return;
        }

  // 보호 엔드포인트일 경우 토큰을 명시적으로 첨부
  const isProtected = endpoint.includes('/home/recommend-products');
  const token = getAccessToken();
  const headers = isProtected && token ? { Authorization: `Bearer ${token}` } : undefined;
  const response = await axiosInstance.get<ApiResponse>(endpoint, { headers });
        console.info("[PerfumeGrid] response", {
          endpoint,
          status: response.status,
          isSuccess: (response.data as any)?.isSuccess,
          hasArrayResult: Array.isArray((response.data as any)?.result),
        });
        const { isSuccess, result } = response.data;

        if (!isSuccess) {
          throw new Error(`API 실패: ${response.data.code} - ${response.data.message}`);
        }

        if (!Array.isArray(result)) {
          throw new Error("API 응답 형식이 올바르지 않습니다 (배열이 아님).");
        }

  setPerfumes(result);
      } catch (e) {
        console.error("[PerfumeGrid] fetch error", { endpoint, error: e });
        setError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopularPerfumes();
  }, [endpoint]);

  if (isLoading) {
    // 스켈레톤 UI
    return (
      <div>
        <p className="mb-4 text-center text-gray-500">인기 상품을 불러오는 중입니다...</p>
        {variant === 'grid' ? (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: limit }).map((_, index) => (
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
        ) : (
          <div className="min-h-[30vh] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-400" />
          </div>
        )}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">오류: {error.message}</div>;
  }

  if (variant === 'grid') {
    // API 데이터를 PerfumeCard가 사용하는 Perfume 타입으로 변환
    const formattedPerfumes: Perfume[] = perfumes.slice(0, limit).map((p) => ({
      id: p.id ?? p.productId!,
      name: p.name,
      brand: (p.brand ?? '브랜드 정보 없음').trim(),
      imageUrl: p.imageUrl,
      description: `Middle: ${p.middleNote}, Base: ${p.baseNote}`,
      purchaseUrl: '#',
      notes: [p.middleNote, p.baseNote],
      price: p.price,
    }));

    return (
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {formattedPerfumes.map((perfume) => (
          <PerfumeCard key={perfume.id} perfume={perfume} />
        ))}
      </div>
    );
  }

  // detail 레이아웃 (PopularPerfumeId UI 흡수)
  return (
    <div>
      {perfumes.map((perfume, index) => {
        const pid = perfume.id ?? perfume.productId!;
        return (
        <section key={pid} className="mb-8">
          <div className="container mx-auto px-4">
            <div className="bg-[#F8F5F2] min-h-[70vh] flex">
              {/* 왼쪽 제품 이미지 */}
              <div className="w-1/2 flex items-center justify-center p-16">
                <img
                  src={perfume.imageUrl || popularproducts}
                  alt={perfume.name}
                  className="w-[464px] h-[600px] object-contain"
                  onError={(e) => {
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
                    {perfume.topNote?.length > 0 && (
                      <p className="text-lg">
                        <span className="font-semibold">Top: </span>
                        {perfume.topNote.map((note) => note.name).join(', ')}
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
                          className={`text-2xl ${i < perfume.itemRating ? 'text-yellow-500' : 'text-gray-300'}`}
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
                      to={`/shopping/${pid}`}
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
      )})}
    </div>
  );
}
