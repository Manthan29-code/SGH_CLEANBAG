/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Button = ({ text, variant, darkMode, to, onClick }) => {
  const buttonClasses = {
    primary: darkMode
      ? "bg-[#10B981] text-[#0A0F0D] hover:bg-[#34D399]"
      : "bg-[#047857] text-white hover:bg-[#065F46]",
    secondary: darkMode
      ? "bg-[#065F46] text-[#D1FAE5] hover:bg-[#34D399]"
      : "bg-[#D1FAE5] text-[#1E3A24] hover:bg-[#A7F3D0]",
  };

  const buttonElement = (
    <motion.button
      className={`px-6 py-2 rounded-lg font-semibold transition duration-300 ${buttonClasses[variant]}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {text}
    </motion.button>
  );

  return to ? <Link to={to}>{buttonElement}</Link> : buttonElement;
};

export default Button;
