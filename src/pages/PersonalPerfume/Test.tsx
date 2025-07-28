import Navbar from "../../components/Navbar"
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PerfumeCard } from "./perfume-card";
import { perfumes } from "../../types/perfumetypes";

type Gender = 'female' | 'male' | 'private';
type Season = 'spring' | 'summer' | 'autumn' | 'winter';
type Style = 'pure' | 'feminine' | 'neutral' | 'masculine' | 'chic' | 'warm';
type Space = 'garden' | 'rainy_room' | 'sunny_room' | 'dawn';
type Occasion = 'sweet' | 'fresh' | 'woody' | 'earthy';
type StandoutScent = 'floral' | 'spicy' | 'powdery' | 'pungent';
type Attraction = 'fruity_herbal' | 'woody_bookstore' | 'salty_sand' | 'earthy_mist';

export default function Test() {
  const [step, setStep] = useState(0);
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [season, setSeason] = useState<Season | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [space, setSpace] = useState<Space | null>(null);
  const [occasion, setOccasion] = useState<Occasion | null>(null);
  const [standoutScent, setStandoutScent] = useState<StandoutScent | null>(null);
  const [attraction, setAttraction] = useState<Attraction | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleNext = () => {
    if (step < 7) {
        setStep(step + 1);
    } else {
        handleShowResults();
    }
  };

  const handleBack = () => {
    if (showResults || isLoading) {
        setShowResults(false);
        setIsLoading(false);
        setStep(7);
        return;
    }
    if (step > 0) {
      setStep(step - 1);
    }
  };
  
  const handleSelect = <T,>(setter: (value: T) => void, value: T) => {
    setter(value);
    handleNext();
  }
  
  const handleShowResults = () => {
      setIsLoading(true);
      setTimeout(() => {
          setIsLoading(false);
          setShowResults(true);
      }, 3000);
  }

  const renderStep = () => {
    if (isLoading) {
        return (
            <div className="text-center w-full">
                <svg width="60" height="85" viewBox="0 0 60 85" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto mb-4 text-primary">
                    <path d="M54.1667 9.16667H5.83333C4.24242 9.16667 3.33333 7.50001 3.33333 5.83334V3.33334C3.33333 2.44929 4.04492 1.66667 5 1.66667H10.8333V0.833336C10.8333 0.372919 11.2063 0 11.6667 0H15C15.4604 0 15.8333 0.372919 15.8333 0.833336V1.66667H44.1667V0.833336C44.1667 0.372919 44.5396 0 45 0H48.3333C48.7937 0 49.1667 0.372919 49.1667 0.833336V1.66667H55C55.9551 1.66667 56.6667 2.44929 56.6667 3.33334V5.83334C56.6667 7.50001 55.7576 9.16667 54.1667 9.16667Z" fill="currentColor"/>
                    <path d="M42.483 14.1667H17.517C10.9765 14.1667 5.83333 19.31 5.83333 25.8504C5.83333 30.1215 8.16917 33.9133 11.8322 36.1965C10.9946 38.6042 10.4167 41.2032 10.4167 43.9167C10.4167 54.3499 18.7334 62.6667 29.1667 62.6667C31.5714 62.6667 33.8569 62.1158 35.9184 61.1213C36.6358 65.0383 37.5255 68.8055 38.5638 72.391C39.0494 74.0818 41.0567 74.8329 42.6105 73.9317L54.761 67.2415C56.0964 66.4678 56.6315 64.8324 56.1245 63.3824L48.2435 39.421C55.1528 35.034 59.1667 28.6186 59.1667 21.25C59.1667 17.3488 57.6534 13.6708 55.0064 10.9238C52.3594 8.17684 48.7779 6.25 44.5833 6.25C44.5833 10.6067 42.483 14.1667 42.483 14.1667ZM30 84.1667C27.2386 84.1667 25 81.9281 25 79.1667C25 76.4052 27.2386 74.1667 30 74.1667C32.7614 74.1667 35 76.4052 35 79.1667C35 81.9281 32.7614 84.1667 30 84.1667Z" fill="currentColor"/>
                    <path d="M42.483 14.1667C42.483 14.1667 44.5833 10.6067 44.5833 6.25C38.6922 6.25 33.7842 11.2312 33.75 17.5C33.75 24.3225 38.6367 30 44.5833 30C49.914 30 54.4258 25.9961 55.0064 20.9238C52.3594 23.1768 48.7779 25.625 44.5833 25.625C44.5833 21.2683 42.483 17.7117 42.483 14.1667Z" fill="currentColor"/>
                </svg>
                <h3 className="text-xl font-bold text-[#AB3130] mb-4">CHICCHIC</h3>
                <p className="text-[#AB3130]/80">{nickname}님과 어울리는 향수를 찾는 중이에요!</p>
            </div>
        )
    }

    if (showResults) {
        const recommendedPerfume = perfumes[0];
        return (
            <div className="text-center w-full">
                 <h2 className="text-3xl font-headline font-bold text-[#AB3130] mb-4">{nickname}님을 위한 추천 향수</h2>
                 <p className="text-[#AB3130]/80 mb-8">당신의 취향을 분석하여 완벽한 향수를 찾아냈어요.</p>
                 <div className="max-w-xs mx-auto mb-8">
                    <PerfumeCard perfume={recommendedPerfume} />
                 </div>
                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
                     <Link to="/personal-perfume-test" className="w-full sm:w-auto text-center py-3 px-6 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">다시 테스트하기</Link>
                     <Link to={recommendedPerfume.purchaseUrl} className="w-full sm:w-auto text-center py-3 px-6 rounded-full bg-[#AB3130] text-white hover:bg-[#AB3130]/90 transition-colors shadow-md">쇼핑하러 가기</Link>
                 </div>
            </div>
        )
    }

    switch (step) {
      case 0:
        return (
          <div className="text-left w-full">
            <h1 className="text-3xl font-headline font-bold text-[#AB3130] mb-4">
              Welcome!
            </h1>
            <p className="text-[#AB3130]/80 mb-2">
              안녕하세요, 퍼스널 향수 추천 테스트에 오신 것을 환영합니다!
            </p>
            <p className="text-[#AB3130]/80 mb-10">
              먼저 닉네임을 정해주세요.
            </p>
            <div className="mb-10 max-w-md">
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="이름을 입력해주세요."
                className="w-full bg-transparent border-0 border-b border-[#AB3130]/50 focus:ring-0 focus:border-[#AB3130] text-left placeholder-[#AB3130]/60 px-0 text-[#AB3130]"
              />
            </div>
            <button
              onClick={handleNext}
              disabled={!nickname}
              className="w-full max-w-md text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              다음으로
            </button>
          </div>
        );

      case 1:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">1</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님의 성별을 알려주세요.
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setGender, 'female')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                여성
              </button>
              <button onClick={() => handleSelect(setGender, 'male')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                남성
              </button>
              <button onClick={() => handleSelect(setGender, 'private')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                공개하지 않음
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">2</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님과 가장 어울리는 계절은 언제인가요?
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setSeason, 'spring')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                따스한 바람이 불고 꽃이 피는 봄
              </button>
              <button onClick={() => handleSelect(setSeason, 'summer')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                뜨거운 태양빛이 비치는 여름
              </button>
              <button onClick={() => handleSelect(setSeason, 'autumn')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                서늘한 공기가 불며 낙엽이 떨어지는 가을
              </button>
              <button onClick={() => handleSelect(setSeason, 'winter')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                고요하고 차가운 바람이 부는 겨울
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">3</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님의 추구미는 무엇인가요?
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-md">
              <button onClick={() => handleSelect(setStyle, 'pure')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                순수함
              </button>
              <button onClick={() => handleSelect(setStyle, 'feminine')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                여성스러운
              </button>
              <button onClick={() => handleSelect(setStyle, 'neutral')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                중성적인
              </button>
              <button onClick={() => handleSelect(setStyle, 'masculine')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                남성스러운
              </button>
              <button onClick={() => handleSelect(setStyle, 'chic')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                시크한
              </button>
              <button onClick={() => handleSelect(setStyle, 'warm')} 
                className="w-full text-left px-4 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                따뜻한
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">4</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님이 가장 선호하는 공간은 어디인가요?
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setSpace, 'garden')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                이슬 맺힌 들꽃이 가득한 숲 속의 정원
              </button>
              <button onClick={() => handleSelect(setSpace, 'rainy_room')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                깊고 진한 와인 향이 가득한 비 오는 한밤중의 방 안
              </button>
              <button onClick={() => handleSelect(setSpace, 'sunny_room')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                커튼 사이로 나른한 오후 햇살이 새어들어오는 나무 바닥의 방 안
              </button>
              <button onClick={() => handleSelect(setSpace, 'dawn')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                따뜻한 차 한 잔을 즐길 수 있는 고요한 새벽
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">5</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님이 지칠 때 가장 맡고싶은 향은 무엇인가요?
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setOccasion, 'sweet')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                달콤한 바닐라와 꿀
              </button>
              <button onClick={() => handleSelect(setOccasion, 'fresh')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                신선한 풀 내음과 레몬의 톡톡 튀는 향
              </button>
              <button onClick={() => handleSelect(setOccasion, 'woody')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                따뜻하고 중성적인 머스크와 나무의 향
              </button>
              <button onClick={() => handleSelect(setOccasion, 'earthy')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                흙내음과 비 내린 후 차분한 공기의 향
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">6</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님을 더 돋보이게 할 수 있는 향은 무엇인가요?
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setStandoutScent, 'floral')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                고혹적이고 깊은 꽃 향
              </button>
              <button onClick={() => handleSelect(setStandoutScent, 'spicy')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                향초처럼 잔잔히 퍼지는 스파이시한 향
              </button>
              <button onClick={() => handleSelect(setStandoutScent, 'powdery')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                은은하고 세련된 파우더리한 향
              </button>
              <button onClick={() => handleSelect(setStandoutScent, 'pungent')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                톡 쏘는 향과 그 뒤에 남는 잔향의 이어짐
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="text-left w-full">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">7</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              {nickname}님이 낯선 도시를 여행한다면 어떤 향에 끌릴 것 같나요?
            </p>
            <div className="flex flex-col gap-4 max-w-md">
              <button onClick={() => handleSelect(setAttraction, 'fruity_herbal')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                시장의 과일과 허브가 뒤섞인 생기 있는 향
              </button>
              <button onClick={() => handleSelect(setAttraction, 'woody_bookstore')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                골목길의 오래된 서점이 품은 나무 향
              </button>
              <button onClick={() => handleSelect(setAttraction, 'salty_sand')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                해변의 소금기 어린 바람과 따뜻한 모래 냄새
              </button>
              <button onClick={() => handleSelect(setAttraction, 'earthy_mist')} 
                className="w-full text-left px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md">
                안개 낀 새벽길, 가로등 아래서 풍기는 흙내
              </button>
            </div>
            <div className="mt-10">
              <button
                onClick={handleShowResults}
                className="w-full max-w-md text-left px-6 py-3 rounded-full bg-[#AB3130] text-white hover:bg-[#AB3130]/90 transition-colors shadow-md"
              >
                결과보기
              </button>
            </div>
          </div>
        );


      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-orange-100">
      <main className="flex-grow flex items-start justify-center container mx-auto px-4 py-8">
        <div className="bg-[#F4F4EF] p-8 sm:p-12 rounded-2xl shadow-2xl border border-[#AB3130]/10 w-full max-w-2xl">
          
          {(step > 0 || showResults || isLoading) && (
            <div className="mb-8">
              <button onClick={handleBack} 
                className="flex items-center gap-2 text-sm text-[#AB3130]/80 hover:text-[#AB3130]">
                <ArrowLeft className="h-4 w-4" />
                뒤로가기
              </button>
            </div>
          )}
          
          <div className="w-full">
            {renderStep()}
          </div>
        </div>
      </main>
    </div>
  );
}