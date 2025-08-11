// Brand page
import brandImage from "../../assets/images/brand.png";
import mainLogo from "../../assets/images/white logo.png";
import chanelLogo from "../../assets/images/Chanel.png";
import diorLogo from "../../assets/images/Dior.png";
import givenchyLogo from "../../assets/images/Givenchy.png";
import hermesLogo from "../../assets/images/Hermes.png";
import marcjacobsLogo from "../../assets/images/marcjacobs.png";
import pradaLogo from "../../assets/images/prada.png";
import tomfordLogo from "../../assets/images/TomFord.png";

export default function Brand() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex-grow">
				<section className="bg-[#66191F] text-white">
					<div className="max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20">
						<div className="flex flex-col items-center text-center gap-4">
							<img
								src={mainLogo}
								alt="CHICCHIC Brand Logo"
								className="w-28 h-28 md:w-36 md:h-36 object-contain"
							/>
							{/* Small bottle/brand mark replacement using wordmark */}
							<p className="text-3xl md:text-4xl text-[#F3E3E3] leading-loose">
								오랜 시간 사랑받고 있는 메이저 향수 브랜드,
								<br className="hidden md:block" />
								그들이 담은 특별한 향기를 CHICCHIC에서 경험해보세요.
							</p>
						</div>

						<div className="relative mt-8 md:mt-10 flex items-center justify-center">
							<div aria-hidden className="absolute left-1/2 -translate-x-1/2 top-1/2 h-px w-screen bg-white/40" />
							<h2 className="relative z-10 px-3 md:px-4 bg-[#66191F] text-5xl md:text-6xl font-headline font-semibold">
								Brand List
							</h2>
						</div>

						{/* Brand image (replaces grid) */}
						<div className="mt-8 flex justify-center">
							<img
								src={brandImage}
								alt="Major perfume brand list"
								className="w-full max-w-5xl rounded-md shadow-sm"
							/>
						</div>
					</div>
				</section>

				{/* Major brands section */}
				<section className="bg-[#F8F5F2]">
					<div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
						<h3 className="text-3xl md:text-5xl font-headline font-bold text-[#AB3130]">
							Major Brands
						</h3>
						<p className="mt-4 text-[#7A3B3B] text-base md:text-lg">
							아래의 브랜드들은 오랜 전통과 혁신적 감각을 바탕으로, 독창적인 향의
							경험을 선사합니다.
						</p>
					</div>
				</section>
						<section className="bg-[#66191F] text-white">
							<div className="max-w-6xl mx-auto px-4 pb-14 md:pb-20">
								{[
									{
										nameKo: "샤넬",
										logoSrc: chanelLogo,
										enQuote:
											"Simplicity is the keynote of all true elegance.",
										koQuote: "진정한 우아함의 핵심은 ‘단순함’입니다.",
										url: "https://www.chanel.com/",
									},
									{
										nameKo: "디올",
										logoSrc: diorLogo,
										enQuote: "I Love Dior",
										koQuote: "",
										url: "https://www.dior.com/",
									},
									{
										nameKo: "톰포드",
										logoSrc: tomfordLogo,
										enQuote: "Private Blend is my own scent laboratory.",
										koQuote: "프라이빗 블렌드는 나만의 향수 실험실이다.",
										url: "https://www.tomford.com/beauty/",
									},
									{
										nameKo: "에르메스",
										logoSrc: hermesLogo,
										enQuote: "The perfume is the music of the body.",
										koQuote: "향수는 몸의 음악이다.",
										url: "https://www.hermes.com/",
									},
									{
										nameKo: "지방시",
										logoSrc: givenchyLogo,
										enQuote: "Live Irresistible.",
										koQuote: "거부할 수 없는 매력을 살아라.",
										url: "https://www.givenchybeauty.com/",
									},
									{
										nameKo: "마크제이콥스",
										logoSrc: marcjacobsLogo,
										enQuote: "Daisy is the essence of youthful spirit.",
										koQuote: "데이지는 젊은 감성의 정수다.",
										url: "https://www.marcjacobs.com/",
									},
									{
										nameKo: "프라다",
										logoSrc: pradaLogo,
										enQuote: "Never the same, always myself.",
										koQuote: "늘 같지 않되, 언제나 나다.",
										url: "https://www.prada.com/",
									},
								].map((b, idx, arr) => (
									<div key={b.nameKo}>
										<div className="py-7 md:py-10 flex items-start gap-5 md:gap-8">
											{/* Logo image */}
											<div className="bg-white rounded-md w-24 h-24 md:w-32 md:h-32 flex items-center justify-center overflow-hidden">
												<img src={b.logoSrc} alt={`${b.nameKo} logo`} className="object-contain w-5/6 h-5/6" />
											</div>

											{/* Texts */}
											<div className="flex-1 min-w-0">
												<div className="flex items-start justify-between gap-3">
													<h4 className="text-lg md:text-2xl font-semibold">
														{b.nameKo}
													</h4>
													<a
														href={b.url}
														target="_blank"
														rel="noopener noreferrer"
														className="shrink-0 inline-flex items-center rounded-full bg-[#F8F5F2] text-[#66191F] hover:bg-white px-4 py-2 text-sm md:text-base font-semibold transition-colors"
													>
														공식 홈페이지 이동
													</a>
												</div>
												<p className="mt-3 text-sm md:text-lg text-[#F3E3E3] leading-relaxed">
													{b.enQuote && `"${b.enQuote}"`} {b.koQuote && `— ${b.koQuote}`}
												</p>
											</div>
										</div>
										{idx < arr.length - 1 && (
											<hr className="border-white/25" />
										)}
									</div>
								))}
							</div>
						</section>
			</main>
		</div>
	);
}

