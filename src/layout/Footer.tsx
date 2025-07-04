import React from "react";
import logo from "@/assets/logo.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-10 mt-20 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Логотип и магазины */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="logo" className="w-10 h-10" />
              <span className="text-2xl font-bold text-black dark:text-white">Moviee</span>
            </div>
            <p className="text-sm">Play Market</p>
            <p className="text-sm">App Store</p>
          </div>

          {/* О нас */}
          <div>
            <h3 className="font-bold text-lg mb-4">О нас</h3>
            <ul className="space-y-2 text-sm">
              <li>Публичная офферта</li>
              <li>Реклама</li>
              <li>F.A.Q</li>
              <li>Контакты</li>
            </ul>
          </div>

          {/* Категории */}
          <div>
            <h3 className="font-bold text-lg mb-4">Категории</h3>
            <ul className="space-y-2 text-sm">
              <li>Кино</li>
              <li>Театр</li>
              <li>Концерты</li>
              <li>Спорт</li>
            </ul>
          </div>

          {/* Контакты */}
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