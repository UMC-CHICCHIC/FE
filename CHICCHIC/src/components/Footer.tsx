import { Link } from "react-router-dom";

type FooterProps = {
  variant?: "default" | "brand";
};

const Footer = ({ variant = "default" }: FooterProps) => {
  const isBrand = variant === "brand";
  const wrapperClass = isBrand
    ? "bg-[#66191F] text-white"
    : "bg-transparent text-[#AB3130]";
  const hrClass = isBrand ? "border-white/60" : "border-[#AB3130]";
  return (
    <footer className={`font-pretendard text-normal px-5 py-4 ${wrapperClass}`}>
      <hr className={`mb-5 ${hrClass}`} />
      <p className="text-base">© 2025 CHICCHIC. All right reserved.</p>
      <div className="flex gap-2 sm:gap-2 text-base mb-5">
        <Link to="/privacy-policy" className="hover:underline">
          Privacy Policy
        </Link>
        <span className="sm:inline">|</span>
        <Link to="/terms" className="hover:underline">
          Terms of Service
        </Link>
        <span className="sm:inline">|</span>
        <Link to="/contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
