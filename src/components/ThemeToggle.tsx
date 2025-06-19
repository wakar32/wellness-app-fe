import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  const iconSrc =
    theme === "light"
      ? "/icons/moon-stars-fill.svg"
      : "/icons/brightness-high-fill.svg";
  const altText =
    theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode";

  return (
    <button
      onClick={toggleTheme}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        marginRight: "1rem",
      }}
    >
      <img src={iconSrc} alt={altText} width="24" height="24" />
    </button>
  );
};

export default ThemeToggle;
