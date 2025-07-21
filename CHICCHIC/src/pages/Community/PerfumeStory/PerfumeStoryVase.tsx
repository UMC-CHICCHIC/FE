const PerfumeStoryVase = () => {
  return (
    <div className="w-full">
      <div className="h-[80vh] w-full bg-[url('/storyVaseBg.png')] bg-cover bg-center bg-no-repeat flex items-end justify-start">
        <div className="mb-[8rem] text-left ml-[8rem]">
          <h2 className="text-[3rem] text-[#FFFFFF] font-bold leading-tight drop-shadow-lg">
            퍼퓸? 오드퍼퓸?
            <br />
            향수 부향률 알아보기!
          </h2>
        </div>
      </div>

      <div className="w-[80%] mx-auto px-8 py-12 bg-[#F5F5F5]">
        <div className="mb-16">
          <p className="text-gray-700 leading-relaxed text-[1.5rem] mb-6">
            "퍼퓸? 오드퍼퓸? 뭐가 다른 거지?"
            <br />
            <br />
            향수를 고르다 보면 'Eau de Parfum', 'Eau de Toilette' 같은 말들을
            자주 보게 되죠. 하지만 이게 향의 종류인지, 브랜드인지, 헷갈리는
            분들도 많습니다. 이 용어들은 바로 '부향률(Fragrance Concentration)',
            즉 향수에 얼마나 많은 향료가 포함되어 있는지를 나타내는 표현이에요.
            <br />
            <br />
            부향률이 무엇인지, 종류별 차이는 어떤지, 그리고 나에게 맞는 향수를
            고르는 팁까지 정리 해드릴게요!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            부향률이란?
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            부향률은 향수 안에 들어있는 향료(에센스)의 비율을 말합니다. 나머지는
            주로 알코올과 물이죠. 향료의 비율이 높을수록 향이 진하고 오래
            지속되며, 보통 가격도 더 높아요.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            2. 향수 종류별 부향률 비교
          </h3>
          <div className="overflow-x-auto mt-6">
            <table className="w-full border-collapse border border-gray-300 text-lg">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-4 py-4 text-left font-semibold text-gray-800 text-xl">
                    종류
                  </th>
                  <th className="border border-gray-300 px-4 py-4 text-center font-semibold text-gray-800 text-xl">
                    향료 함량
                  </th>
                  <th className="border border-gray-300 px-4 py-4 text-center font-semibold text-gray-800 text-xl">
                    지속 시간
                  </th>
                  <th className="border border-gray-300 px-4 py-4 text-center font-semibold text-gray-800 text-xl">
                    특징
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-4">
                    <div className="font-medium text-gray-900 text-lg">
                      퍼퓸(Parfum) 또는 Extrait
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    20~30%
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    6~12시간
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-lg">
                    가장 진하고 고급.
                    <br />
                    소량만 사용해도 충분함
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-4">
                    <div className="font-medium text-gray-900 text-lg">
                      오드퍼퓸
                    </div>
                    <div className="text-base text-gray-600">
                      (Eau de Parfum, EDP)
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    15~20%
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    5~8시간
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-lg">
                    가장 대중적.
                    <br />
                    데일리, 포멀 모두 적합함
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-4">
                    <div className="font-medium text-gray-900 text-lg">
                      오드뚜왈렛
                    </div>
                    <div className="text-base text-gray-600">
                      (Eau de Toilette, EDT)
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    5~15%
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    3~5시간
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-lg">
                    가볍고 산뜻함.
                    <br />
                    여름이나 실내에서 적합함
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-4">
                    <div className="font-medium text-gray-900 text-lg">
                      오드코롱
                    </div>
                    <div className="text-base text-gray-600">
                      (Eau de Cologne, EDC)
                    </div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    2~5%
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    1~3시간
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-lg">
                    시원하고 휘발성이 강함.
                    <br />
                    남성용으로도 자주 사용됨
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-4">
                    <div className="font-medium text-gray-900 text-lg">
                      오프레쉬
                    </div>
                    <div className="text-base text-gray-600">(Eau Fraiche)</div>
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    1~3%
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-center text-lg">
                    1시간 이하
                  </td>
                  <td className="border border-gray-300 px-4 py-4 text-lg">
                    향료보다는 기분 좋는 알코올.
                    <br />
                    바디 미스트와 유사함
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            3. 부향률이 높다고 무조건 좋을까?
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            꼭 그렇지만은 않아요. 향이 오래가는 걸 선호한다면 퍼퓸이 좋겠지만,
            활동량이 많거나 여름철, 또는 향이 진한 게 부담스러운 환경에서는
            EDT나 코롱이 오히려 더 적합할 수 있어요. 또한, 같은 라인의 향수라도
            부향률에 따라 향의 느낌이 달라질 수 있어요.
            <br />
            예: 같은 '블루밍 부케'라도 EDP와 EDT는 향의 무게감이나 지속력이
            다름.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            4. 향수를 고를 때 고려할 점
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            <span className="font-bold">사용 장소 </span>: 사무실, 학교, 야외
            활동 등
            <br />
            <span className="font-bold">계절과 날씨 </span>: 여름엔 가벼운 향,
            겨울엔 깊은 향 추천
            <br />
            <span className="font-bold">지속력 vs 산뜻함 </span>: 얼마나 오래
            향이 지속되길 원하는가?
            <br />
            <span className="font-bold">가격대 </span>: 퍼퓸일수록 가격이 비싸니
            예산 고려!
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            5. 향수 똑똑하게 사용하는 팁!
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            소량으로 시작하세요. 퍼퓸은 1~2회만 뿌려도 충분해요.
            <br />
            땀이 많이 나는 부위보단 맥박이 뛰는 부위(손목, 귀 뒤 등)에 뿌리면
            지속력이 높아져요.
            <br />
            레이어링을 고려해 바디로션이나 샤워젤과 같은 향을 함께 사용하면 향이
            더 오래가요.
          </p>
        </div>
        <div className="mb-16">
          <h3 className="text-[2rem] font-bold text-[#AB3130] mb-6 border-l-4 border-[#AB3130] pl-4">
            마무리
          </h3>
          <p className="text-gray-700 leading-relaxed text-[1.5rem]">
            고고대 이집트에서의 향수는 단순한 향기가 아니라 종교, 권력, 영혼,
            정체성을 담은 신성한 도구였어요. 향기를 통해 신과 교감하고, 권위를
            드러내며, 죽음 이후까지 이어지는 삶을 준비했던 고대 이집트인들의
            삶은 향수라는 매개체였다는 점이 흥미롭지 않나요?
          </p>
        </div>
      </div>
    </div>
  );
};

export default PerfumeStoryVase;
