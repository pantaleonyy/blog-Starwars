import { Outlet } from "react-router-dom/dist"
import ScrollToTop from "../components/ScrollToTop"
import { Navbar } from "../components/Navbar"


// Base component that maintains the navbar and footer throughout the page and the scroll to top functionality.
export const Layout = () => {
  return (
    <div className="bg-dark text-light min-vh-100">
      <ScrollToTop>
        <Navbar />
        <main className="container py-4">
          <Outlet />
        </main>
      </ScrollToTop>
    </div>
  );
};