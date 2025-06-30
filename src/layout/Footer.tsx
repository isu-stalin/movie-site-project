import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-black py-10 mt-20 text-gray-700 dark:text-gray-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">

          <div>
            <div className="text-2xl font-bold text-black dark:text-white mb-4">
              🎬 Moviee
            </div>
            <p className="text-sm">play market</p>
            <p className="text-sm">app store</p>
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
            <p className="text-sm font-semibold"> +998 (90) 123-45-67</p>
            <div className="flex gap-4 mt-4">
              {/* <a href="#"><img src="" alt="facebook" className="w-6 h-6" /></a>
              <a href="#"><img src="" alt="twitter" className="w-6 h-6" /></a>
              <a href="#"><img src="" alt="instagram" className="w-6 h-6" /></a> */}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);