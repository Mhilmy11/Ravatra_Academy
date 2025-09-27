import { BrowserRouter, Route, Routes, useLocation } from "react-router";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";

import RegularTraining from "./pages/RegularTraining";
import Kursus from "./pages/Kursus";
import Seminar from "./pages/Seminar";
import ELearning from "./pages/ELearning";

import DetailProduct from "./pages/DetailProduct";
import CheckoutPage from "./pages/CheckoutPage";
import AdminApproval from "./pages/AdminApproval";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarLayout = [
    "/checkoutproduct",
    "/admin-approval",
    "/login",
    "/dashboard",
  ];
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarLayout.find((route) =>
        location.pathname.startsWith(route)
      ) && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route
            path="/admin-approval/:id/:userId"
            element={<AdminApproval />}
          />

          {/* product pages */}
          <Route path="/regulartraining" element={<RegularTraining />} />
          <Route path="/elearning" element={<ELearning />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/kursus" element={<Kursus />} />

          <Route
            path="/checkoutproduct/:product_id"
            element={<CheckoutPage />}
          />

          {/* Detail pages */}
          <Route
            path="/regulartraining/detailproduct/:id"
            element={<DetailProduct />}
          />
          <Route
            path="/inhouse/detailproduct/:id"
            element={<DetailProduct />}
          />
          <Route
            path="/videotraining/detailproduct/:id"
            element={<DetailProduct />}
          />
          <Route
            path="/webinar/detailproduct/:id"
            element={<DetailProduct />}
          />

          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {!hideNavbarLayout.find((route) =>
        location.pathname.startsWith(route)
      ) && <Footer />}
    </div>
  );
};

export default function App() {
  return (
    <>
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    </>
  );
}
