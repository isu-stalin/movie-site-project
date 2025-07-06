import { Suspense } from "react";
import MainRouter from "./pages";
import Preloader from "./components/preloader/Preloader";
import ScrollToTop from "./components/scrollToTop/ScrollToTop";

const App = () => {
  return (
    <div className="dark:bg-black dark:text-white bg-slate-100">
      <ScrollToTop/>
      <Suspense fallback={<Preloader/>}>
        <MainRouter />
      </Suspense>
    </div>
  );
};

export default App;