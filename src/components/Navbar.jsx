import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      setIsLoggedIn(true);
      setUser(JSON.parse(userData));
    }

    const handleScroll = () => {
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/?q=${navSearch}`);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white bg-opacity-95 backdrop-blur-md shadow text-black"
          : "Navbar text-white"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4 py-4">

        {/* Logo */}
        <h1
          className={`text-2xl font-bold tracking-wide ${
            scrolled ? "text-blue-700" : "text-white"
          }`}
        >
          Ark21
        </h1>

        {/* SEARCH BAR - ONLY VISIBLE WHEN SCROLLED */}
        {scrolled && location.pathname === "/" && (
          <form
            onSubmit={handleSearch}
            className="hidden md:block mx-6 flex-1 max-w-xl"
          >
            <input
              className="w-full border rounded-lg px-4 py-2 focus:outline-none"
              placeholder="Search products..."
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
            />
          </form>
        )}

        {/* Menu */}
        <div className="space-x-6 text-base md:text-lg flex items-center">

          <Link className="hover:text-blue-500 transition" to="/">
            Home
          </Link>

          {/* MENU WHEN NOT LOGGED IN */}
          {!isLoggedIn && (
            <>
              <Link className="hover:text-blue-500 transition" to="/buyer">
                Buyer
              </Link>

              <Link className="hover:text-blue-500 transition" to="/seller">
                Seller
              </Link>

              <Link
                className={`px-4 py-2 rounded-lg transition ${
                  scrolled
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
                to="/login"
              >
                Login
              </Link>
            </>
          )}

          {/* PROFILE ICON - ONLY WHEN LOGGED IN */}
          {isLoggedIn && user && (
            <div className="relative">

              {/* ROUND PROFILE ICON */}
              <div
                onClick={() => setOpen(!open)}
                className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                  scrolled
                    ? "bg-blue-700 text-white"
                    : "bg-white text-blue-700"
                }`}
              >
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              {/* DROPDOWN */}
              {open && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow rounded-lg text-black">

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setOpen(false)}
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
