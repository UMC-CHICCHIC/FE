import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { searchProductByName } from "../apis/productSearch";
import type { ProductSearchResult } from "../types/searchtype";
import SearchIcon from "../assets/icons/navbar-search.svg";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<ProductSearchResult | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetch = async () => {
      if (searchQuery.trim().length === 0) {
        setSearchResult(null);
        setShowDropdown(false);
        return;
      }
      const result = await searchProductByName(searchQuery.trim());
      setSearchResult(result);
      setShowDropdown(!!result);
    };
    const timer = setTimeout(fetch, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showDropdown]);
  

  return (
    <div className="relative hidden md:block mr-2 sm:mr-4" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="px-3 sm:px-4 py-1 text-xs sm:text-sm border rounded-3xl w-32 sm:w-48 lg:w-56 xl:w-72 focus:outline-none bg-transparent text-[#F7F4EF] border-[#F7F4EF]"
        onFocus={() => { if (searchQuery.trim().length > 0) setShowDropdown(true); }}
        autoComplete="off"
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            const result = await searchProductByName(searchQuery.trim());
            setSearchResult(result);
            setShowDropdown(true);
            if (result && result.name.trim().toLowerCase() === searchQuery.trim().toLowerCase()) {
              navigate(`/shopping/${result.id}`);
              setShowDropdown(false);
              setSearchQuery("");
            }
          }
        }}
      />
      <button
        className="absolute transform -translate-y-1/2 right-2 sm:right-3 top-1/2"
        onClick={async () => {
          const result = await searchProductByName(searchQuery.trim());
          setSearchResult(result);
          setShowDropdown(true);
          if (result && result.name.trim().toLowerCase() === searchQuery.trim().toLowerCase()) {
            navigate(`/shopping/${result.id}`);
            setShowDropdown(false);
            setSearchQuery("");
          }
        }}
        tabIndex={-1}
        type="button"
      >
        <img
          src={SearchIcon}
          alt="Search Icon"
          className="cursor-pointer"
          width={15}
        />
      </button>
      {showDropdown && (
        <div className="absolute left-0 mt-2 w-full bg-white text-[#AB3130] rounded-lg shadow-lg border border-[#AB3130]/20 z-50">
          {searchResult ? (
            <button
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[#AB3130]/10 transition-colors text-left rounded-lg cursor-pointer"
              onClick={() => {
                navigate(`/shopping/${searchResult.id}`);
                setShowDropdown(false);
                setSearchQuery("");
              }}
            >
              <img
                src={searchResult.imageUrl}
                alt={searchResult.name}
                className="w-10 h-10 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = "https://dummyimage.com/100x100/ccc/fff&text=No+Image";
                }}
              />
              <div>
                <div className="font-semibold">{searchResult.name}</div>
                <div className="text-xs text-[#AB3130]/70">{searchResult.brand} · {searchResult.ml}ml</div>
              </div>
            </button>
          ) : (
            <div className="px-4 py-3 text-sm text-[#AB3130]/60 text-center select-none">
              검색 결과 없음
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;