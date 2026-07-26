import { Routes, Route } from "react-router";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage";
import RegularTraining from "./pages/products/RegularTraining";
import ELearning from "./pages/products/ELearning";
import Seminar from "./pages/products/Seminar";
import Kursus from "./pages/products/Kursus";
import Brevet from "./pages/products/Brevet";
import DetailProduct from "./pages/products/DetailProduct";
// import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/products/regular-training"
            element={<RegularTraining />}
          />

          <Route path="/products/elearning" element={<ELearning />} />

          <Route path="/products/seminar" element={<Seminar />} />

          <Route path="/products/kursus" element={<Kursus />} />

          <Route path="/products/brevet" element={<Brevet />} />

          <Route path="/products/:type/:slug" element={<DetailProduct />} />

          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
