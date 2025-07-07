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
  const [menuOpen, setMenuOpen] = useState(false);
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
      setMenuOpen(false);
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
        
        <div className="flex items-center gap-2 text-2xl font-bold text-black dark:text-white">
          <NavLink to="/" className="flex items-center gap-2 text-[#C61F1F]">
            <img src={logo} className="w-[56px]" alt="logo" />
            Movies
          </NavLink>
        </div>

        <button
          className="md:hidden text-black dark:text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Открыть меню"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
            }`}>
            <img src={movieIc} alt="" className="w-7 h-7" />
            Home
          </NavLink>
          <NavLink to="/movies" className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
            }`}>
            <img src={tabledIc} alt="" className="w-7 h-7" />
            Movies
          </NavLink>
          <NavLink to="/saved" className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
            }`}>
            <img src={savedIc} alt="" className="w-7 h-7" />
            Saved
          </NavLink>

          <form onSubmit={handleSearch} className="flex items-center gap-2 relative">
            {showInput && (
              <div className="relative w-64">
                <input
                  ref={inputRef}
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Поиск фильмов..."
                  className="w-full px-4 py-2 border border-gray-400 rounded dark:bg-slate-800 dark:text-white pr-10"
                />
                <button type="submit" title="Искать" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-600 hover:text-[#C61F1F]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
                  </svg>
                </button>
              </div>
            )}
            <button type="button" onClick={() => setShowInput((prev) => !prev)} className={`flex flex-col items-center text-sm font-medium ${
              showInput ? "text-[#C61F1F]" : "text-black dark:text-white"
            }`}>
              <img src={SearchIc} alt="Search" className="w-7 h-7" />
              Search
            </button>
          </form>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <button onClick={handleTheme} title="Сменить тему" className="text-xl text-black dark:text-white">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 3.582 8 8 8h0.5c0.667 0 1.294-0.263 1.768-0.732l1.5-1.5c0.651-0.65 0.732-1.678 0.154-2.442a1.75 1.75 0 00-1.422-.826l-1.83-.03a2.5 2.5 0 01-2.43-2.5c0-1.381 1.119-2.5 2.5-2.5h1c2.761 0 5-2.239 5-5 0-2.485-2.015-4.5-4.5-4.5z" />
            </svg>
          </button>
          <NavLink to="/profile" className={({ isActive }) =>
            `flex flex-col items-center text-sm font-medium ${
              isActive ? "text-[#C61F1F]" : "text-black dark:text-white"
            }`}>
            <img src={profileIc} alt="Profile" className="w-7 h-7" />
            Профиль
          </NavLink>
        </div>

        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white dark:bg-black shadow-md flex flex-col items-center gap-4 py-4">
            <NavLink to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
              <img src={movieIc} className="w-6 h-6" alt="Home" />
              Home
            </NavLink>
            <NavLink to="/movies" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
              <img src={tabledIc} className="w-6 h-6" alt="Movies" />
              Movies
            </NavLink>
            <NavLink to="/saved" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
              <img src={savedIc} className="w-6 h-6" alt="Saved" />
              Saved
            </NavLink>
            <NavLink to="/profile" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 text-black dark:text-white">
              <img src={profileIc} className="w-6 h-6" alt="Profile" />
              Профиль
            </NavLink>
            <button onClick={handleTheme} className="text-black dark:text-white">
              Сменить тему
            </button>
            <form onSubmit={handleSearch} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Поиск фильмов..."
                className="w-48 px-2 py-1 border rounded dark:bg-slate-800 dark:text-white"
              />
              <button type="submit" className="text-black dark:text-white">Искать</button>
            </form>
          </div>
        )}
      </div>
    </header>

  );
};

export default Header;