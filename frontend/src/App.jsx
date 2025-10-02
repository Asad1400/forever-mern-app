import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import PlaceOrder from "./pages/PlaceOrder";
import Product from "./pages/Product";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import { ToastContainer } from "react-toastify";
import Verify from "./pages/Verify";

function AppContent() {
  const location = useLocation();

  const validRoutes = [
    "/",
    "/collection",
    "/cart",
    "/about",
    "/contact",
    "/login",
    "/orders",
    "/placeorder",
    "/verify",
  ];

  const showNavbar =
    validRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/product/");

  const showFooter =
    validRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/product/");

  const showSearch =
    validRoutes.includes(location.pathname) ||
    location.pathname.startsWith("/product/");

  return (
    <>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        {showNavbar && <Navbar />}
        {showSearch && <SearchBar />}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/product/:productId" element={<Product />} />

          <Route
            path="*"
            element={
              <h1 className="text-2xl font-bold flex justify-center items-center h-screen">
                No Pages Found
              </h1>
            }
          />
        </Routes>
      </div>
      {showFooter && <Footer />}
    </>
  );
}

export default function App() {
  return <AppContent />;
}
