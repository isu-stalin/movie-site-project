import React from "react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black text-gray-700 dark:text-gray-300 mt-auto">
      <div className="container mx-auto px-4 py-10 flex flex-col gap-10">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10">
          
          <div className="flex-shrink-0">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-black dark:text-white">Moviee</span>
            </div>
            <p className="text-sm">Play Market</p>
            <p className="text-sm">App Store</p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">О нас</h3>
            <ul className="space-y-2 text-sm">
              <li>Публичная офферта</li>
              <li>Реклама</li>
              <li>F.A.Q</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>Кино</li>
              <li>Театр</li>
              <li>Концерты</li>
              <li>Спорт</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Связаться с нами</h3>
            <p className="text-sm font-semibold">+998 (90) 123-45-67</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);
