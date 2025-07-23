import { useState, useEffect } from 'react';

interface Perfume {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: string;
  volume: string;
}

// 가짜 데이터
const MOCK_SCRAPS: Perfume[] = [
  {
    id: 1,
    name: "탐다오",
    brand: "딥디크",
    price: "138,000 ₩",
    volume: "75ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=탐다오",
  },
  {
    id: 2,
    name: "랑방 에끌라드",
    brand: "랑방",
    price: "85,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=랑방",
  },
  {
    id: 3,
    name: "샤넬 No.5",
    brand: "샤넬",
    price: "180,000 ₩",
    volume: "100ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=샤넬",
  },
  {
    id: 4,
    name: "미스 디올",
    brand: "디올",
    price: "150,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=디올",
  },
  {
    id: 5,
    name: "톰포드 블랙 오키드",
    brand: "톰포드",
    price: "220,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=톰포드",
  },
  {
    id: 6,
    name: "조 말론 라임 바질",
    brand: "조 말론",
    price: "120,000 ₩",
    volume: "30ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=조말론",
  },
  {
    id: 7,
    name: "이솝 타시트",
    brand: "이솝",
    price: "95,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=이솝",
  },
  {
    id: 8,
    name: "버버리 허",
    brand: "버버리",
    price: "110,000 ₩",
    volume: "75ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=버버리",
  },
  {
    id: 9,
    name: "크리드 아벤투스",
    brand: "크리드",
    price: "350,000 ₩",
    volume: "100ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=크리드",
  },
  {
    id: 10,
    name: "메종 마르지엘라",
    brand: "마르지엘라",
    price: "140,000 ₩",
    volume: "100ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=마르지엘라",
  },
  {
    id: 11,
    name: "르 라보 로즈",
    brand: "르 라보",
    price: "160,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=르라보",
  },
  {
    id: 12,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 13,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 14,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 15,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 16,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 17,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 18,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 19,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 20,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 21,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
  {
    id: 22,
    name: "바이레도 블랑쉬",
    brand: "바이레도",
    price: "145,000 ₩",
    volume: "50ml",
    imageUrl: "https://dummyimage.com/300x300/ccc/fff&text=바이레도",
  },
];

const MyScraps = () => {
  const [scraps, setScraps] = useState<Perfume[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;
  const totalPages = Math.ceil(MOCK_SCRAPS.length / itemsPerPage);

  useEffect(() => {
    // axios 연동

    // Mock 데이터
    const fetchMockScraps = () => {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setScraps(MOCK_SCRAPS.slice(start, end));
    };

    fetchMockScraps();
  }, [page]);

  return (
    <div className="min-h-screen bg-[#66191F] pt-10 pb-20 text-[#F7F4EF] px-3">
      <div className="text-center mb-12 mt-5">
        <h2 className="text-3xl mb-6">MY SCRAP</h2>
        <div className="w-10 h-px bg-[#F7F4EF] mx-auto mb-6 opacity-50"></div>
        <p className="text-base font-light">원하는 향수를 스크랩하고 한 눈에 확인해보세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-7xl mx-auto">
        {scraps.map((perfume, index) => (
          <div key={`${perfume.id}-${index}`} className="overflow-hidden cursor-pointer">
            <img 
              src={perfume.imageUrl} 
              alt={perfume.name} 
              className="w-full h-auto object-cover" 
            />
            <div className="p-2 pt-4 pb-4 text-left font-light">
              <div className="text-sm opacity-70 mb-1">{perfume.brand}</div>
              <div className="flex justify-between font-light">
              <div className="text-base mb-2">{perfume.name}</div>
              <div className="text-sm opacity-80 mb-1">{perfume.volume}</div>
              </div>
              <div className="text-sm">{perfume.price}</div>
            </div>
          </div>
        ))}
      </div>

      {/* 페이지네이션 */}
      <div className="flex justify-center mt-10 gap-2">
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            onClick={() => setPage(idx + 1)}
            className={`w-8 h-8 rounded-md text-sm font-medium transition-all ${
              page === idx + 1
                ? "bg-[#AB3130] text-white"
                : "bg-transparent text-white border border-white hover:bg-white hover:text-[#601E1C]"
            }`}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MyScraps;