import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { perfumes } from "../../types/perfumetypes";
import { checkAuthToken, getPerfumeTestAnswers, getPerfumeRecommendations } from "../../apis/personalPerfumeTest";
import type { PerfumeTestAnswers, RecommendationItem } from "../../types/personalPerfumeTest";

// 모든 필수 문항 ID 상수화
const REQUIRED_QIDS = [1, 2, 3, 4, 5, 6, 7] as const;

// 공통 로딩 패널 (UI는 그대로 유지)
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
  const [prevAnswers, setPrevAnswers] = useState<PerfumeTestAnswers | null>(null);
  const [selected, setSelected] = useState<Record<number, number>>({});
  const [reco, setReco] = useState<RecommendationItem[] | null>(null);
  const [recoError, setRecoError] = useState<string | null>(null);

  // 초기 진입 시: 로그인 토큰 체크 -> 과거 답변 조회 -> UI 처리
  useEffect(() => {
    const init = async () => {
      setInitLoading(true);
      const isValid = await checkAuthToken();
      if (!isValid) {
        // 로그인 필요: 로그인 페이지로 이동, 돌아올 경로 전달
        navigate("/login", { replace: true, state: { from: location.pathname } });
        return;
      }

      // 로그인 유효 -> 과거 답변 조회
      try {
        const answers = await getPerfumeTestAnswers();
        if (answers) {
          setPrevAnswers(answers);
          setShowResults(true); // 과거 답변이 있으면 결과 화면으로 진입
        }
      } catch (e) {
        // 조회 실패는 테스트 진행으로 계속
        console.warn("Failed to load previous perfume test answers", e);
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
    // 마지막 문항(7)에서는 비동기 상태 반영 전에 결과 계산이 실행되는 것을 방지
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
    handleNext();
  };

  const handleReset = () => {
    setIsLoading(false);
    setShowResults(false);
    setInitLoading(false);
    setPrevAnswers(null);
    setSelected({});
    setReco(null);
    setRecoError(null);
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
      // 기본값 없이, 모든 문항 선택을 요구
      const requiredQids = REQUIRED_QIDS as readonly number[];
      const unanswered = requiredQids.filter((qid) => selectedState[qid] == null);
      if (unanswered.length > 0) {
        setIsLoading(false);
        setShowResults(false);
        // 첫 미답변 문항으로 이동
        alert(`문항 ${unanswered[0]}을(를) 선택해 주세요.`);
        setStep(unanswered[0]);
        return;
      }
      const answers = requiredQids.map((qid) => ({
        questionId: qid,
        optionId: selectedState[qid]!,
      }));
      const data = await getPerfumeRecommendations({ answers });
      setReco(data.result || []);
      setShowResults(true);
    } catch (e: any) {
      console.error("추천 요청 실패", e);
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

          {prevAnswers && (
            <div className="max-w-2xl mx-auto mb-6 p-3 rounded-lg bg-[#AB3130]/10 text-[#AB3130] text-sm">
              과거 테스트 답변을 불러왔어요. 아래 추천은 이전 응답을 기반으로 합니다.
            </div>
          )}

          {recoError && (
            <div className="max-w-2xl mx-auto mb-6 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
              {recoError}
            </div>
          )}

          {/* 실제 API 데이터를 우선적으로 사용하는 향수 목록 */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto mb-8">
            {(reco && reco.length > 0 ? reco.slice(0, 4) : perfumes.slice(0, 4)).map((item, index) => {
              // API 데이터와 fallback 데이터 구조 통합 처리
              const image = (("imageUrl" in item && (item as any).imageUrl) || "/sample-image.png") as string;
              const name = ("perfumeName" in item ? (item as any).perfumeName : `${(item as any).brand} ${(item as any).name}`) as string;
              const notes = ("recommendedNotes" in item
                ? (item as any).recommendedNotes?.slice(0, 3).join(", ")
                : (item as any).notes?.slice(0, 3).join(", ") || "notenotenotenotenotenotenote") as string;
              const to = ("productId" in item ? `/shopping/${(item as any).productId}` : "/shopping/:perfumeId") as string;
              
              return (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg border border-[#AB3130]/10 flex items-center gap-6">
                  <div className="w-32 h-32 flex-shrink-0 flex items-center justify-center">
                    <img src={image} alt={name} className="w-full h-full object-contain rounded-xl" />
                  </div>
                  <div className="flex-1 text-center">
                    <h3 className="text-lg font-semibold text-[#AB3130] mb-2">{name}</h3>
                    <p className="text-sm text-[#AB3130]/80 mb-3">{name}</p>
                    <p className="text-sm text-[#AB3130]/60 mb-4">{notes}</p>
                    <Link to={to} className="py-2 px-6 inline-block rounded-full border border-[#AB3130]/50 text-[#AB3130] text-sm hover:bg-[#AB3130]/10 transition-colors">
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
        return null;
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
