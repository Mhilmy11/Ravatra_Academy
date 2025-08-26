import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import Navbar from "./components/Navbar";
import RegularTraining from "./pages/RegularTraining";
import Footer from "./components/Footer";
import ComingSoonPage from "./pages/ComingSoonPage";
import InHouseTraining from "./pages/InHouseTraining";
import Kursus from "./pages/Kursus";
import Seminar from "./pages/Seminar";
import DetailProduct from "./pages/DetailProduct";
import CheckoutPage from "./pages/CheckoutPage";
import AdminApproval from "./pages/AdminApproval";

const MainLayout = () => {
  const location = useLocation();

  const hideNavbarLayout = ["/checkoutproduct", "/admin-approval"];
  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarLayout.find((route) =>
        location.pathname.startsWith(route)
      ) && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<ComingSoonPage />} />

          <Route
            path="/admin-approval/:id/:userId"
            element={<AdminApproval />}
          />

          {/* product pages */}
          <Route path="/regulartraining" element={<RegularTraining />} />
          <Route path="/inhousetraining" element={<InHouseTraining />} />
          <Route path="/seminar" element={<Seminar />} />
          {/* <Route path="/kursus" element={<Kursus />} /> */}

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

          <Route path="*" element={<ComingSoonPage />} />
        </Routes>
      </main>

      <Footer />
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
