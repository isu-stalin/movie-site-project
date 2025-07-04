import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import logo from "@/assets/logo.svg";
import movieIc from "@/assets/movie-icon.svg";
import tabledIc from "@/assets/tablet-line.svg";
import savedIc from "@/assets/saved-icon.svg";
import profileIc from "@/assets/Profile_Icon.svg";
import SearchIc from "@/assets/Search-icon.svg";

const Header = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParam = new URLSearchParams(search).get("query") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    if (showInput) {
      inputRef.current?.focus();
    }
  }, [showInput]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/search");
    }
  };

  const handleTheme = () => {
    const isDark = document.body.classList.toggle("dark");
    const newTheme = isDark ? "dark" : "light";
    localStorage.setItem("theme", newTheme);
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-black dark:text-white">
          <NavLink
            className="flex items-center gap-2 text-[#C61F1F]"
            to="/"
          >
            <img src={logo} className="w-[56px]" alt="logo" />
            Movies
          </NavLink>
        </div>

        <div className="flex items-center gap-6 relative">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm font-medium ${
                isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={movieIc}
                  alt=""
                  className={`w-7 h-7 ${isActive ? "filter-red" : ""}`}
                />
                Home
              </>
            )}
          </NavLink>
          <NavLink
            to="/movies"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm font-medium ${
                isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={tabledIc}
                  alt=""
                  className={`w-7 h-7 ${isActive ? "filter-red" : ""}`}
                />
                Movies
              </>
            )}
          </NavLink>
          <NavLink
            to="/saved"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm font-medium ${
                isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={savedIc}
                  alt=""
                  className={`w-7 h-7 ${isActive ? "filter-red" : ""}`}
                />
                Saved
              </>
            )}
          </NavLink>

          <form onSubmit={handleSearch} className="flex items-center gap-2 relative">
            {showInput && (
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск фильмов..."
                className="w-64 md:w-80 px-4 py-2 border border-gray-400 rounded dark:bg-slate-800 dark:text-white transition-all duration-300"
              />
            )}
            <button
              type="button"
              title="Поиск"
              onClick={() => setShowInput((prev) => !prev)}
              className={`flex flex-col items-center text-sm font-medium ${
                showInput ? "text-[#C61F1F]" : "text-black dark:text-white"
              }`}
            >
              <img
                src={SearchIc}
                alt="Search"
                className={`w-7 h-7 ${showInput ? "filter-red" : ""}`}
              />
              Search
            </button>
          </form>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={handleTheme}
            title="Сменить тему"
            className="text-xl text-black dark:text-white"
          >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 3.582 8 8 8h0.5c0.667 0 1.294-0.263 1.768-0.732l1.5-1.5c0.651-0.65 0.732-1.678 0.154-2.442a1.75 1.75 0 00-1.422-.826l-1.83-.03a2.5 2.5 0 01-2.43-2.5c0-1.381 1.119-2.5 2.5-2.5h1c2.761 0 5-2.239 5-5 0-2.485-2.015-4.5-4.5-4.5z"/>
          </svg>
          </button>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              `flex flex-col items-center text-sm font-medium ${
                isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <img
                  src={profileIc}
                  alt="Profile"
                  className={`w-7 h-7 ${isActive ? "filter-red" : ""}`}
                />
                Профиль
              </>
            )}
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;