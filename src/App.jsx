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

import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import LayoutDashboard from "./components/LayoutDashboard";
import DashboardPage from "./pages/Admin/DashboardPage";
import OrdersPage from "./pages/Admin/OrdersPage";
import UsersPage from "./pages/Admin/UsersPage";
import ProductsPage from "./pages/Admin/ProductsPage";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarLayout = ["/checkoutproduct", "/login", "/dashboard"];
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarLayout.find((route) =>
        location.pathname.startsWith(route),
      ) && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<LandingPage />} />

          {/* product pages */}
          <Route path="/regulartraining" element={<RegularTraining />} />
          <Route path="/elearning" element={<ELearning />} />
          <Route path="/seminar" element={<Seminar />} />
          <Route path="/kursus" element={<Kursus />} />

          <Route
            path="/checkoutproduct/:product_id"
            element={<CheckoutPage />}
          />

          <Route path="/product/:id" element={<DetailProduct />} />

          {/* admin private*/}
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <LayoutDashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="products" element={<ProductsPage />} />
          </Route>

          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {!hideNavbarLayout.find((route) =>
        location.pathname.startsWith(route),
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
