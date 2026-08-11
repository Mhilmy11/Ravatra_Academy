import { Routes, Route, useLocation } from "react-router";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import LandingPage from "./pages/LandingPage";
import RegularTraining from "./pages/products/RegularTraining";
import ELearning from "./pages/products/ELearning";
import Seminar from "./pages/products/Seminar";
import Kursus from "./pages/products/Kursus";
import Brevet from "./pages/products/Brevet";

import DetailProduct from "./pages/products/DetailProduct";

import ProtectedRoute from "./routes/ProtectedRoute";
import CheckoutPage from "./pages/CheckoutPage";
import ProfilePage from "./pages/ProfilePage";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
// import NotFound from "./pages/NotFound";

function App() {
  const location = useLocation();

  const hideLayout = ["/login", "/register"].includes(location.pathname);

  const isCheckout = location.pathname.startsWith("/checkout/");

  const hideNavbarFooter = hideLayout || isCheckout;

  return (
    <>
      {!hideNavbarFooter && <Navbar />}

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

          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout/:checkoutToken" element={<CheckoutPage />} />
          </Route>
        </Routes>
      </main>

      {!hideNavbarFooter && <Footer />}
    </>
  );
}

export default App;
