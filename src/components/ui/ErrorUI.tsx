import React from "react";

interface Props {
  message?: string;
  onRetry?: () => void;
}

const ErrorUI: React.FC<Props> = ({ message = "Что-то пошло не так.", onRetry }) => {
  return (
    <div className="text-center py-10 text-gray-800 dark:text-white">
      <h2 className="text-xl font-semibold mb-4">{message}</h2>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-5 py-2 bg-black dark:bg-white dark:text-black text-white rounded hover:opacity-80 transition"
        >
          Обновить
        </button>
      )}
    </div>
  );
};

export default React.memo(ErrorUI);