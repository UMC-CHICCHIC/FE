import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      className="font-pretendard text-normal bg-transparent px-5 py-4"
      style={{ color: "#AB3130" }}
    >
      <hr className="mb-5" style={{ color: "#AB3130" }} />
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
