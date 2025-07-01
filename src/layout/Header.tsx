import { useEffect, useState, useRef } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { useNavigate, useLocation, NavLink } from "react-router-dom";

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
    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-black shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-black dark:text-white"><NavLink to="/">🎬 Moviee</NavLink></div>

        <div className="flex items-center gap-6 relative">
          <NavLink to="/" className="text-sm font-medium hover:underline">
            Home
          </NavLink>
          <NavLink to="/movies" className="text-sm font-medium hover:underline">
            Movies
          </NavLink>

          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 relative"
          >
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
              className="text-xl text-black dark:text-white"
            >
              <SearchOutlined />
            </button>
          </form>
        </div>

        <button
          onClick={handleTheme}
          title="Сменить тему"
          className="text-xl text-black dark:text-white"
        >
          🌗
        </button>
      </div>
    </header>
  );
};

export default Header;
