import { useState, useEffect } from 'react';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import SamplePerfumeImg from "../../assets/images/samplePerfumeImg.png";

interface Perfume {
  id: number;
  name: string;
  brand: string;
  imageUrl: string;
  price: string;
  volume: string;
}

// 임시
const MOCK_SCRAPS: Perfume[] = [
    {
    id: 1,
    name: "탐다오",
    brand: "딥디크",
    price: "138,000 ₩",
    volume: "75ml",
    imageUrl: SamplePerfumeImg,
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

const itemsPerPage = 16;

const MyScraps = () => {
  const [scraps, setScraps] = useState<Perfume[]>([]);
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(MOCK_SCRAPS.length / itemsPerPage);
  const pageGroupSize = 5;
  const currentGroup = Math.ceil(page / pageGroupSize);
  
  const startPage = (currentGroup - 1) * pageGroupSize + 1;
  const endPage = Math.min(currentGroup * pageGroupSize, totalPages);

  useEffect(() => {
    // axios 연동
    // 임시 데이터
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setScraps(MOCK_SCRAPS.slice(start, end));
  }, [page]);

  return (
    <div className="min-h-screen bg-[#66191F] pt-10 pb-20 text-[#F7F4EF] px-3 sm:px-3">

      <div className="text-center mb-13 mt-13">
        <h2 className="text-5xl mb-8">MY SCRAP</h2>
        <div className="w-15 h-px bg-[#F7F4EF] mx-auto mb-7 opacity-50"></div>
        <p className="text-lg sm:text-xl font-extralight">
          원하는 향수를 스크랩하고 한 눈에 확인해보세요.
        </p>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto">
        {scraps.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[#F7F4EF] opacity-70 mb-4">아직 스크랩한 향수가 없습니다.</p>
            <p className="text-base text-[#F7F4EF] opacity-50">마음에 드는 향수를 스크랩해보세요!</p>
          </div> // api 연동 후 수정
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {scraps.map((perfume, index) => (
              <div key={`${perfume.id}-${index}`} className="overflow-hidden cursor-pointer">
                {/* 이미지 */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-[#F7F4EF]">
                  <img
                    src={perfume.imageUrl}
                    alt={perfume.name}
                    className="w-full h-full object-contain transition-transform duration-300 hover:scale-110 active:scale-105"
                  />
                </div>
                {/* 텍스트 */}
                <div className="p-2 pt-4 pb-6 text-left">
                  <div className="text-lg mb-1 font-extralight">{perfume.brand}</div>
                  <div className="sm:flex sm:justify-between">
                    <div className="text-2xl font-semibold mb-2">{perfume.name}</div>
                    <div className="text-lg font-extralight">{perfume.volume}</div>
                  </div>
                  <div className="text-lg font-extralight">{perfume.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 페이지네이션 - 스크랩이 있을 때만 표시 */}
      {scraps.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center py-12 space-x-4">
          {/* 이전 페이지 버튼 */}
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className={`p-2 cursor-pointer items-center justify-center transition-all ${
              page === 1
                ? "text-white/40 cursor-not-allowed"
                : "text-white hover:bg-white/10"
            }`}
          >
            <IoChevronBack size={32} />
          </button>

          {/* 페이지 번호 */}
          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const pageNumber = startPage + idx;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`flex box-border items-center justify-center w-[44px] h-11 text-2xl cursor-pointer py-2 px-3 focus:outline-none ${
                  page === pageNumber
                    ? "bg-[#F7F4EF] text-[#AB3130]"
                    : "text-[#F7F4EF] hover:bg-[#F7F4EF] hover:text-[#AB3130]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          {/* 다음 페이지 버튼 */}
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className={`w-10 h-10 flex items-center justify-center transition-all ${
              page === totalPages
                ? "text-white/40 cursor-not-allowed"
                : "text-white hover:bg-white/10"
            }`}
          >
            <IoChevronForward size={32} />
          </button>
        </div>
      )}
    </div>
  );
};

export default MyScraps;