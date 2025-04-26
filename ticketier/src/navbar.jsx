import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "./client.js";

export default function MainAppNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Navigation items
  const navItems = [
    { name: "Profile", path: "/mainapp/profile" },
    { name: "My Tickets", path: "/mainapp/tickets" },
    { name: "Events", path: "/mainapp" },
    { name: "Support", path: "/mainapp/support" },
  ];

  useEffect(() => {
    // Check initial session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    getSession();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    // Handle window resize
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      authListener.subscription.unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setIsMenuOpen(false);
    navigate("/");
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.header
      className="bg-gradient-to-r from-[#2D3436] to-[#1E272E] p-4 text-white shadow-lg"
      initial="hidden"
      animate="visible"
      variants={headerVariants}
    >
      <div className="flex justify-between items-center font-display max-w-7xl mx-auto">
        <motion.h1
          className="font-extrabold text-4xl tracking-wide"
          variants={navItemVariants}
        >
          <span className="text-[#1E90FF]">Ticketier</span>
        </motion.h1>

        <motion.button
          className="md:hidden z-50 focus:outline-none"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          ariachargement="true"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="w-8 h-8 flex flex-col justify-center gap-2">
            <span
              className={`bg-white h-1 w-full rounded transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`bg-white h-1 w-full rounded transition-all duration-300 ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`bg-white h-1 w-full rounded transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </div>
        </motion.button>

        <motion.nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex fixed md:static top-0 right-0 h-full md:h-auto w-3/4 md:w-auto bg-[#2D3436] md:bg-transparent flex-col md:flex-row items-center justify-center md:justify-end gap-6 text-lg transition-all duration-300 z-40 ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:translate-x-0`}
          variants={navVariants}
          initial="hidden"
          animate={isDesktop || isMenuOpen ? "visible" : "hidden"}
        >
          <ul className="flex flex-col md:flex-row gap-6 items-center">
            {navItems.map((item) => (
              <motion.li key={item.name} variants={navItemVariants}>
                <Link
                  id={`nav-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  to={item.path}
                  className="hover:text-[#1E90FF] transition duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.li>
            ))}
            {user ? (
              <motion.li variants={navItemVariants}>
                <motion.button
                  id="nav-sign-out"
                  className="bg-[#FF6B6B] hover:bg-[#E55A5A] px-4 py-2 rounded-lg font-semibold"
                  whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSignOut}
                >
                  Log Out
                </motion.button>
              </motion.li>
            ) : (
              <>
                <motion.li variants={navItemVariants}>
                  <Link to="/signup">
                    <motion.button
                      id="nav-sign-up"
                      className="bg-[#1E90FF] hover:bg-[#1C86EE] px-4 py-2 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </motion.button>
                  </Link>
                </motion.li>
                <motion.li variants={navItemVariants}>
                  <Link to="/login">
                    <motion.button
                      id="nav-login"
                      className="bg-[#00FF7F] hover:bg-[#00E670] px-4 py-2 rounded-lg font-semibold"
                      whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)" }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </motion.button>
                  </Link>
                </motion.li>
              </>
            )}
          </ul>
        </motion.nav>
      </div>
    </motion.header>
  );
}