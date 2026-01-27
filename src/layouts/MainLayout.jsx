import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function MainLayout() {
  const location = useLocation();

  const showFooterOn = ["/", "/about"];
  const showFooter = showFooterOn.includes(location.pathname);

  return (
    <>
      <Navbar />
      <Outlet />
      {showFooter && <Footer />}
    </>
  );
}
