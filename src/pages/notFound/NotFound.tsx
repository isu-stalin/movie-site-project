// src/pages/NotFound.tsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl mb-4">Фильм не найден или страница не существует.</p>
      <Link to="/" className="text-blue-500 underline hover:text-blue-700 transition">
        Вернуться на главную
      </Link>
    </div>
  );
};

export default NotFound;