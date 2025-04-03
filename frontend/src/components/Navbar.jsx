import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { 
  Menu, X, Sun, Moon, User, LogIn, LogOut,
  Home, Truck, Award, ChevronDown, Bell,
  BarChart2, Users, Settings, MapPin 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const navLinks = {
  resident: [
    { name: "Dashboard", path: "/resident", icon: Home },
    { name: "Report Bin", path: "/resident/report", icon: MapPin },
    { name: "Schedule", path: "/resident/schedule", icon: Truck },
    { name: "Rewards", path: "/resident/rewards", icon: Award },
  ],
  garbage_collector: [
    { name: "Dashboard", path: "/collector", icon: BarChart2 },
    { name: "Routes", path: "/collector/routes", icon: Truck },
    { name: "Collections", path: "/collector/collections", icon: MapPin },
    { name: "Schedule", path: "/collector/schedule", icon: Award },
  ],
  admin: [
    { name: "Dashboard", path: "/admin", icon: BarChart2 },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart2 },
    { name: "Settings", path: "/admin/settings", icon: Settings },
  ],
};

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  const { 
    user, 
    isAuthenticated, 
    logout,
    notifications = []
  } = useAuth();

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  const userRole = user?.role || 'guest';
  const userNotifications = notifications.length;
  const userName = user?.name || '';

  // Update logout handler
  const handleLogout = async () => {
    await logout();
    navigate('/login');
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setDropdownOpen(false);
  }, [location]);

  const currentLinks = isAuthenticated ? navLinks[userRole] : [];


  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0  w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-[#081C15]/80 backdrop-blur-md shadow-lg"
          : "bg-white dark:bg-[#081C15]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <img
                src="/logo.svg"
                alt="CleanBage"
                className="h-10 w-10 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#95D5B2] rounded-lg opacity-0 group-hover:opacity-20 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-[#2D6A4F] to-[#95D5B2] bg-clip-text text-transparent">
              CleanBage
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors
                  ${isActivePath(link.path)
                    ? "text-[#2D6A4F] dark:text-[#95D5B2] bg-[#2D6A4F]/10 dark:bg-[#2D6A4F]/20"
                    : "text-gray-600 dark:text-gray-300 hover:text-[#2D6A4F] dark:hover:text-[#95D5B2] hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                  }`}
              >
                <link.icon className="h-4 w-4" />
                <span>{link.name}</span>
              </Link>
            ))}

            {isAuthenticated && (
              <button
                className="relative text-gray-600 dark:text-gray-300 hover:text-[#2D6A4F] dark:hover:text-[#95D5B2]"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                {userNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {userNotifications}
                  </span>
                )}
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20 transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-[#95D5B2]" />
              ) : (
                <Moon className="h-5 w-5 text-[#2D6A4F]" />
              )}
            </button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-[#2D6A4F] dark:hover:text-[#95D5B2]"
                >
                  <div className="h-8 w-8 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center">
                    {userName.charAt(0)}
                  </div>
                  <span>{userName}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white dark:bg-[#1B4332] ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 dark:divide-[#2D6A4F]/20"
                    >
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                        >
                          <User className="h-4 w-4" />
                          <span>Profile</span>
                        </Link>
                        <Link
                          to="/settings"
                          className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                        >
                          <Settings className="h-4 w-4" />
                          <span>Settings</span>
                        </Link>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>Sign out</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-[#2D6A4F] text-white hover:bg-[#2D6A4F]/90 transition-colors"
              >
                {/* <LogIn className="h-5 w-5" /> */}
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t dark:border-[#2D6A4F]/20 bg-white dark:bg-[#081C15]"
          >
            <div className="px-4 py-4 space-y-4">
              {isAuthenticated && (
                <div className="flex items-center space-x-3 px-2">
                  <div className="h-10 w-10 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center text-lg">
                    {userName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {userName}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                {currentLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md w-full transition-colors
                      ${isActivePath(link.path)
                        ? "text-[#2D6A4F] dark:text-[#95D5B2] bg-[#2D6A4F]/10 dark:bg-[#2D6A4F]/20"
                        : "text-gray-600 dark:text-gray-300 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                      }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <link.icon className="h-5 w-5" />
                    <span>{link.name}</span>
                  </Link>
                ))}
              </div>

              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="flex items-center space-x-2 px-3 py-2 rounded-md w-full bg-[#2D6A4F] text-white hover:bg-[#2D6A4F]/90"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Login</span>
                </Link>
              )}

              <div className="border-t dark:border-[#2D6A4F]/20 pt-4">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                >
                  {darkMode ? (
                    <>
                      <Sun className="h-5 w-5" />
                      <span>Light Mode</span>
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5" />
                      <span>Dark Mode</span>
                    </>
                  )}
                </button>

                {isAuthenticated && (
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-red-600 dark:text-red-400 hover:bg-[#2D6A4F]/10 dark:hover:bg-[#2D6A4F]/20"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Sign out</span>
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;