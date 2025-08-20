import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { perfumes } from "../../types/perfumetypes";
import { 
  checkAuthToken, 
  getPerfumeRecommendations, 
  getHomeRecommendProducts,
} from "../../apis/personalPerfumeTest";
import type {
  HomeRecommendItem,
} from "../../types/personalPerfumeTest";
import axios from "axios";

// 모든 필수 문항 ID 상수화
const REQUIRED_QIDS = [1, 2, 3, 4, 5, 6, 7] as const;

// 공통 로딩 패널
function LoadingPanel({ message }: { message: string }) {
  return (
    <div className="w-full text-center">
      <img
        src="/src/assets/images/main-logo.png"
        alt="CHICCHIC Logo"
        width={60}
        height={85}
        className="mx-auto mb-4"
      />
      <h3 className="text-xl font-bold text-[#AB3130] mb-4">CHICCHIC</h3>
      <p className="text-[#AB3130]/80">{message}</p>
    </div>
  );
}

export default function Test() {
  const navigate = useNavigate();
  const location = useLocation();
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [initLoading, setInitLoading] = useState(true);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [reco, setReco] = useState<HomeRecommendItem[] | null>(null);
  const [recoError, setRecoError] = useState<string | null>(null);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasPastRecommendations, setHasPastRecommendations] = useState(false);

  // 초기 진입 시: 로그인 토큰 체크 -> 기존 추천 결과 확인
  useEffect(() => {
    const init = async () => {
      setInitLoading(true);
      setAuthError(null);
      
      try {
        console.log("토큰 체크 시작...");
        const isValid = await checkAuthToken();
        console.log("토큰 유효성:", isValid);
        
        if (!isValid) {
          console.log("토큰 무효 - 로그인 페이지로 이동");
          navigate("/auth/login", { 
            replace: true, 
            state: { 
              from: location.pathname,
              message: "로그인이 필요한 서비스입니다."
            }
          });
          return;
        }

        // 기존 추천 결과 확인
        try {
          console.log("기존 추천 결과 조회 시작...");
          const existingRecommendations = await getHomeRecommendProducts();
          console.log("기존 추천 결과:", existingRecommendations);
          
          if (existingRecommendations.length > 0) {
            console.log("기존 추천 결과 발견 - 바로 결과 표시");
            setReco(existingRecommendations);
            setHasPastRecommendations(true);
            setShowResults(true);
          } else {
            console.log("기존 추천 결과 없음 - 새 테스트 시작");
          }
        } catch (e: any) {
          console.error("기존 추천 결과 조회 실패:", e);
          
          if (axios.isAxiosError(e) && e.response?.status === 401) {
            console.log("401 에러 - 토큰 만료 또는 무효");
            navigate("/auth/login", { 
              replace: true, 
              state: { 
                from: location.pathname,
                message: "로그인이 만료되었습니다. 다시 로그인해주세요."
              }
            });
            return;
          }
          
          setAuthError("이전 추천 데이터를 불러올 수 없지만, 새로운 테스트를 진행할 수 있습니다.");
        }
      } catch (error: any) {
        console.error("초기화 중 에러:", error);
        setAuthError("초기화 중 오류가 발생했습니다. 새로고침 후 다시 시도해주세요.");
      } finally {
        setInitLoading(false);
      }
    };
    
    void init();
  }, [navigate, location.pathname]);

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

  const handleSelect = (questionId: number, optionId: number) => {
    setSelected((prev) => {
      const updated = { ...prev, [questionId]: optionId };
      if (step === 7) {
        void handleShowResults(updated);
      } else {
        handleNext();
      }
      return updated;
    });
  };

  const handleStart = () => {
    setAuthError(null);
    setHasPastRecommendations(false);
    handleNext();
  };

  const handleReset = () => {
    setIsLoading(false);
    setShowResults(false);
    setInitLoading(false);
    setSelected({});
    setReco(null);
    setRecoError(null);
    setAuthError(null);
    setHasPastRecommendations(false);
    setStep(0);
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      // scroll 실패 무시
    }
  };

  const handleShowResults = async (selectedOverride?: Record<number, number>) => {
    setIsLoading(true);
    setRecoError(null);
    
    try {
      const selectedState: Record<number, number> = selectedOverride ?? selected;
      const requiredQids = REQUIRED_QIDS as readonly number[];
      const unanswered = requiredQids.filter((qid) => selectedState[qid] == null);
      
      if (unanswered.length > 0) {
        setIsLoading(false);
        setShowResults(false);
        alert(`문항 ${unanswered[0]}을(를) 선택해 주세요.`);
        setStep(unanswered[0]);
        return;
      }
      
      const answers = requiredQids.map((qid) => ({
        questionId: qid,
        optionId: selectedState[qid]!,
      }));
      
      console.log("새 테스트 실행:", answers);
      
      const testResult = await getPerfumeRecommendations({ answers });
      console.log("테스트 실행 결과:", testResult);
      
      const recommendations = await getHomeRecommendProducts();
      console.log("추천 결과 조회:", recommendations);
      
      if (recommendations.length > 0) {
        setReco(recommendations);
      } else {
        setReco([]);
      }
      
      setShowResults(true);
    } catch (e: any) {
      console.error("테스트 실행 실패", e);
      
      if (axios.isAxiosError(e) && e.response?.status === 401) {
        navigate("/auth/login", { 
          replace: true, 
          state: { 
            from: location.pathname,
            message: "로그인이 만료되었습니다. 다시 로그인 후 테스트를 진행해주세요."
          }
        });
        return;
      }
      
      setRecoError(e?.message ?? "추천을 불러오지 못했습니다.");
      setShowResults(true);
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    if (initLoading) return <LoadingPanel message="초기화 중입니다…" />;
    if (isLoading) return <LoadingPanel message="당신과 어울리는 향수를 찾는 중이에요!" />;

    if (showResults) {
      return (
        <div className="w-full text-center">
          <h2 className="text-2xl font-bold text-[#AB3130] mb-6">
            테스트 결과 CHICCHIC이 추천하는 향수들이에요!
          </h2>

          {/* 이전 테스트 결과일 때만 표시 */}
          {hasPastRecommendations && (
           <div className="max-w-2xl mx-auto mb-6 p-3 rounded-lg bg-[#AB3130]/10 text-[#AB3130] text-sm">
              과거 테스트 답변을 불러왔어요. 아래 추천은 이전 응답을 기반으로 합니다.
            </div>
          )}

          {recoError && (
            <div className="max-w-2xl mx-auto mb-6 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {recoError}
            </div>
          )}

          {/* 향수 목록 렌더링 */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-8">
            {(reco && reco.length > 0 ? reco.slice(0, 5) : perfumes.slice(0, 5)).map((item, index) => {
              let image: string;
              let name: string;
              let notes: string;
              let to: string;

              if ('productId' in item && 'topNote' in item) {
                const homeItem = item as HomeRecommendItem;
                image = homeItem.imageUrl || "/sample-image.png";
                name = homeItem.name;
                
                const topNotes = homeItem.topNote.map(note => note.name).join(", ");
                const allNotes = [topNotes, homeItem.middleNote, homeItem.baseNote]
                  .filter(note => note && note.trim() !== "")
                  .join(", ");
                notes = allNotes;
                
                to = `/shopping/${homeItem.productId}`;
              } else {
                const fallbackItem = item as any;
                image = "/sample-image.png";
                name = `${fallbackItem.brand} ${fallbackItem.name}`;
                notes = fallbackItem.notes?.slice(0, 3).join(", ") || "향수 노트";
                to = "/shopping/:perfumeId";
              }
              
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-[#AB3130]/10 flex gap-6">
                  <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <img 
                      src={image} 
                      alt={name} 
                      className="w-full h-full object-contain rounded-xl"
                      onError={(e) => {
                        e.currentTarget.src = "https://dummyimage.com/300x400/ccc/fff&text=No+Image";
                      }}
                    />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-lg font-semibold text-[#AB3130] mb-1">{name}</h3>
                    <p className="text-base text-[#AB3130]/80 mb-3">{name}</p>
                    <p className="text-sm text-[#AB3130]/60 mb-4">{notes}</p>
                    <Link 
                      to={to} 
                      className="py-1 px-5 inline-block rounded-full border border-[#AB3130]/50 text-[#AB3130] font-semibold text-xs hover:bg-[#AB3130]/10 transition-colors"
                    >
                      상세 페이지 이동
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row max-w-md mx-auto">
            <button
              onClick={handleReset}
              className="w-full sm:w-auto text-center py-3 px-6 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
            >
              다시 테스트하기
            </button>
            <Link
              to="/shopping"
              className="w-full sm:w-auto text-center py-3 px-6 rounded-full bg-[#AB3130] text-white hover:bg-[#AB3130]/90 transition-colors shadow-md"
            >
              쇼핑하러 가기
            </Link>
          </div>
        </div>
      );
    }

    switch (step) {
      case 0:
        return (
          <div className="w-full text-center">
            <h1 className="text-4xl font-headline font-semibold text-[#AB3130] mb-4 mt-10">
              Personal Perfume Test
            </h1>
            <p className="text-lg text-[#AB3130] mb-10">
              퍼스널 향수 추천 테스트
            </p>
            <div className="w-50 h-px bg-[#AB3130] mx-auto mb-10 sm:w-100"></div>
            
            {authError && (
              <div className="max-w-md mx-auto mb-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-yellow-800 text-sm">
                <p className="font-medium mb-1">로그인 필요함</p>
                <p>{authError}</p>
              </div>
            )}
            
            <div className="max-w-md mx-auto mb-10 space-y-2">
              <p className="text-[#AB3130]/80">
                무슨 향수가 나에게 어울리는지 잘 모르겠다면
              </p>
              <p className="text-[#AB3130]/80">
                새로운 향수에 도전하고 싶은 향수 애호가라면
              </p>
              <p className="text-[#AB3130]/80">CHICCHIC이 추천 해드릴게요!</p>
            </div>
            <div className="mt-12 justify-center max-w-md gap-4 mx-auto">
              <button
                onClick={handleStart}
                className="text-center px-10 py-2 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                테스트 시작하기
              </button>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">1</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              평소 어떤 성별 계열의 향수를 선호하시나요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(1, 101)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                남성향
              </button>
              <button
                onClick={() => handleSelect(1, 102)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                여성향
              </button>
              <button
                onClick={() => handleSelect(1, 103)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                중성향
              </button>
              <button
                onClick={() => handleSelect(1, 104)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                상관없음
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">2</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              어느 정도의 지속력을 원하시나요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(2, 201)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                EDT (약한 지속력)
              </button>
              <button
                onClick={() => handleSelect(2, 202)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                EDP (중간 지속력)
              </button>
              <button
                onClick={() => handleSelect(2, 203)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                Parfum (강한 지속력)
              </button>
              <button
                onClick={() => handleSelect(2, 204)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                상관없음
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">3</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              어느 계열의 향수가 가장 끌리시나요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(3, 301)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                우디
              </button>
              <button
                onClick={() => handleSelect(3, 302)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                플로럴
              </button>
              <button
                onClick={() => handleSelect(3, 303)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                프레시
              </button>
              <button
                onClick={() => handleSelect(3, 304)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                스위트
              </button>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">4</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              향수를 뿌린지 일정 시간이 지난 후 남는 잔향은 어떤게 좋으신가요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(4, 401)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                샌달우드
              </button>
              <button
                onClick={() => handleSelect(4, 402)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                머스크
              </button>
              <button
                onClick={() => handleSelect(4, 403)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                앰버
              </button>
              <button
                onClick={() => handleSelect(4, 404)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                베티버
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">5</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              평소 어떤 향을 가장 좋아하시나요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(5, 501)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                자스민
              </button>
              <button
                onClick={() => handleSelect(5, 502)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                로즈
              </button>
              <button
                onClick={() => handleSelect(5, 503)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                일랑일랑
              </button>
              <button
                onClick={() => handleSelect(5, 504)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                해당 없음
              </button>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">6</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              앞의 질문과 이어 평소 어떤 향을 가장 좋아하시나요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(6, 601)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                프루티
              </button>
              <button
                onClick={() => handleSelect(6, 602)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                시트러스
              </button>
              <button
                onClick={() => handleSelect(6, 603)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                그린
              </button>
              <button
                onClick={() => handleSelect(6, 604)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                해당 없음
              </button>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="w-full text-center">
            <p className="text-2xl font-bold text-[#AB3130] mb-2">7</p>
            <p className="text-lg text-[#AB3130]/80 mb-8">
              아래의 향 중 본인의 취향이 있으신가요?
            </p>
            <div className="flex flex-col max-w-md gap-4 mx-auto">
              <button
                onClick={() => handleSelect(7, 701)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                파우더리
              </button>
              <button
                onClick={() => handleSelect(7, 702)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                비누향
              </button>
              <button
                onClick={() => handleSelect(7, 703)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                클린
              </button>
              <button
                onClick={() => handleSelect(7, 704)}
                className="w-full text-center px-6 py-3 rounded-full border border-[#AB3130]/50 text-[#AB3130] hover:bg-[#AB3130]/10 transition-colors shadow-md"
              >
                해당 없음
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full text-center">
            <p className="text-[#AB3130]">문항을 불러오는 중입니다...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-[#F7F4EF]/100 via-[#D88EA7]/70 to-[#EAC6D0]/50">
      <main className="container flex items-start justify-center flex-grow px-4 py-20 mx-auto">
        <div className="bg-[#F4F4EF]/80 backdrop-blur-md p-8 sm:p-12 rounded-2xl shadow-2xl border-2 border-[#E8BCBB] w-full max-w-3xl">
          {/* Progress Bar */}
          {step > 0 && step <= 7 && !showResults && !isLoading && (
            <div className="mb-6">
              <div className="w-full bg-[#AB3130]/20 rounded-full h-2">
                <div
                  className="bg-[#AB3130] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(step / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          )}

          {(step > 0 || showResults || isLoading) && (
            <div className="mb-8">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-sm text-[#AB3130]/80 hover:text-[#AB3130]"
              >
                <ArrowLeft className="w-4 h-4" />
                뒤로가기
              </button>
            </div>
          )}
          <div className="w-full">{renderStep()}</div>
        </div>
      </main>
    </div>
  );
}