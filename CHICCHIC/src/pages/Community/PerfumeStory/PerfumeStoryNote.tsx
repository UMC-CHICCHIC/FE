const PerfumeStoryNote = () => {
  return (
    <div className="w-full">
      <div className="h-[80vh] w-full bg-[url('/storyNoteBg.png')] bg-cover bg-center bg-no-repeat flex items-end justify-start">
        <div className="mb-[8rem] text-left ml-[8rem]">
          <h2 className="text-[3rem] text-[#FFFFFF] font-bold leading-tight drop-shadow-lg">
            향수의 3단계 노트,
            <br />
            Top, Middle, Base Note
          </h2>
        </div>
      </div>

      <div className="w-[80%] mx-auto px-8 py-12 bg-[#F5F5F5]">
        <div className="mb-16">
          <p className="text-gray-700 leading-relaxed text-[1.5rem] mb-6">
            향수를 뿌렸을 때, 처음엔 상큼한 향이 나다가 시간이 지나면서 전혀
            다른 향이 느껴졌던 경험, 다들 있으시죠?이는 향수의 3단계 노트 구조
            때문이에요. 향수는 단순히 하나의 향이 아니라, 시간의 흐름에 따라
            변화하는 향의 이야기입니다.
            <br />
            향수 초심자도 쉽게 이해할 수 있도록 Top Note, Middle Note, Base
            Note의 개념과 각각의 역할, 그리고 향수를 고를 때 참고하면 좋은
            팁까지 정리해드릴게요.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            1. 탑 노트(Top Note) - 향수의 첫인상
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            <strong>지속 시간 : </strong> 약 5분 ~ 30분
            <br />
            <strong>주요 역할 : </strong> 첫 인상을 결정하는 향
            <br />
            <br />
            탑 노트는 향수를 뿌렸을 때 가장 먼저 느껴지는 향기에요. 휘발성이
            높아 금방 사라지지만, 향수의 전체적인 첫인상을 좌우하는 중요한
            요소에요.
            <br />
            <br />
            <strong>대표 향료 : </strong> 레몬, 베르가못, 민트, 자몽, 라벤더 등
            상큼하고 가벼운 향기
            <br />
            <strong>팁 : </strong> 향수를 시향할 때 대부분 이 탑 노트만 맡고
            판단하기 쉬운데, 중후반 향까지 기다려보는 인내심이 필요합니다!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            2. 미들 노트(Middle Note) - 향의 중심부
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            <strong>지속 시간 : </strong> 약 30분 ~ 2시간
            <br />
            <strong>주요 역할 : </strong> 향수의 핵심 캐릭터 형성
            <br />
            <br />
            미들 노트는 '하트 노트(Heart Note)'라고도 불리며, 탑 노트가 날아간
            뒤 등장하는 향입니다. 향수의 개성과 분위기를 가장 잘 표현하는 중심
            향이에요.
            <br />
            <br />
            <strong>대표 향료 : </strong> 로즈, 자스민, 일랑일랑, 시나몬, 허브
            등 플로럴, 스파이시, 허브 계열
            <br />
            <strong>특징 : </strong> 우리가 어떤 향수에 빠지게 되는 이유는
            대부분 이 미들 노트 때문이라고 해도 과언이 아니에요.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            3. 베이스 노트(Base Note) - 향수의 마지막 여운
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            <strong>지속 시간 : </strong> 4시간 이상 ~ 하루
            <br />
            <strong>주요 역할 : </strong> 깊이와 지속력 부여
            <br />
            <br />
            베이스 노트는 향수의 마지막 단계, 그리고 가장 오래 남는 향기입니다.
            피부와 만나면서 잔잔하게 지속되며, 향수의 여운을 만들어줍니다.
            <br />
            <br />
            <strong>대표 향료 : </strong> 머스크, 앰버, 우드, 바닐라, 파출리 등
            무게감 있고 따뜻한 향기
            <br />
            <strong>특징 : </strong> 베이스 노트가 좋은 향수는 시간이 지날수록
            더욱 매력적으로 느껴지는 특징이 있어요. 그래서 '잔향 맛집' 향수들이
            인기가 많아요!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            4. 향수 Note를 이해하면 어떤 점이 좋을까?
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            <strong>1. 시향할 때 탑 노트만 보고 실망하는 일 방지</strong>
            <br />
            <br />
            <strong>2. 나의 취향에 맞는 향의 구간을 찾을 수 있음</strong>
            <br />
            • 상쾌한 걸 좋아한다면 탑 노트 중심
            <br />
            • 부드럽고 여성스러운 걸 원한다면 미들 노트
            <br />
            • 따뜻하고 묵직한 향을 좋아한다면 베이스 노트 중심
            <br />
            <br />
            <strong>3. 퍼퓸 레이어링에 활용 가능</strong>
            <br />• 탑은 시트러스, 미들은 플로럴, 베이스는 우디 계열로 조합하는
            등 자신만의 향기 연출 가능
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            마무리
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            향수는 하나의 흐름이 있습니다. 처음은 경쾌하고, 중간은 풍부하며,
            끝은 잔잔한 울림처럼 남아요. 탑, 미들, 베이스 노트를 이해하면 향수를
            더 깊이 있게 느낄 수 있고, 나만의 향기 언어를 만들어갈 수 있습니다.
            다음 번에 향수를 고를 때는 단순한 향이 아니라, 어떤 이야기를 품고
            있는 향인지 살펴보는 여유를 가져보세요!
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfumeStoryNote;
