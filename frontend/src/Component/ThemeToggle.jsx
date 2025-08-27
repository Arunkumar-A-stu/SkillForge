import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 border border-green-500 text-green-400 font-mono rounded-md shadow-lg hover:bg-green-900/30 transition flex items-center gap-2"
    >
      {darkMode ? <Sun size={16} /> : <Moon size={16} />}
      <span className="text-sm">{darkMode ? "LIGHT MODE" : "DARK MODE"}</span>
    </button>
  );
}
