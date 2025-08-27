import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function TerminalAuth() {
  const API_URL = "http://localhost:5000/api/auth";

  const [mode, setMode] = useState(null); // login/register
  const [step, setStep] = useState("choose");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [name, setName] = useState("");
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState([]);
  const [showCursor, setShowCursor] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [lastLogin, setLastLogin] = useState(null);

  // Command history
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => setShowCursor((prev) => !prev), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [logs]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [logs, step, input]);

  // Boot banner typing effect
  useEffect(() => {
    const banner = [
      "  _____ _    _ _ _      ______                      ",
      " / ____| |  | | | |    |  ____|                     ",
      "| (___ | |__| | | |    | |__ ___  _ __ __ _  ___ ___ ",
      " \\___ \\|  __  | | |    |  __/ _ \\| '__/ _` |/ __/ _ \\",
      " ____) | |  | | | |____| | | (_) | | | (_| | (_|  __/",
      "|_____/|_|  |_|_|______|_|  \\___/|_|  \\__,_|\\___\\___|",
      "                                                     ",
      "Welcome to SkillForge v1.0",
      "Type 'help' to see all commands",
      "",
      "Do you want to [login] or [register]?",
      "",
    ];
    let i = 0;
    setLogs([]);
    const interval = setInterval(() => {
    if(i <= banner.length){
      setLogs(banner.slice(0, i));
      i++;
    }
    else{
      clearInterval(interval);
    }
    }, 60);
    return () => clearInterval(interval);
  }, []);
  
  // API functions
  const handleLogin = async (form) => {
    try {
      const res = await axios.post(`${API_URL}/login`, form);
      localStorage.setItem("token", res.data.token);
      const userData = {
        id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      };
      localStorage.setItem("user", JSON.stringify(userData));
      return userData;
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const handleRegister = async (form) => {
    try {
      const res = await axios.post(`${API_URL}/register`, form);
      return res.data;
    } catch (err) {
      throw new Error("Registration failed");
    }
  };

  const resetAuth = () => {
    setStep("choose");
    setMode(null);
    setUsername("");
    setEmail("");
    setPassword("");
    setRetypePassword("");
    setName("");
    setInput("");
    setLogs((prev) => [...prev, "Do you want to [login] or [register]?"]);
  };

  const showHelp = () => {
    setLogs((prev) => [
      ...prev,
      "======= SkillForge Pre-login Help =======",
      "login       → Start login flow",
      "register    → Start registration flow",
      "help        → Show this help message",
      "clear       → Clear terminal screen",
      "Ctrl + P    → Toggle password visibility (password step)",
      "Ctrl + C    → Cancel and go back to choice",
      "========================================",
    ]);
  };

  const handleKeyDown = (e) => {
    // Ctrl+P toggle password visibility
    if (
      e.ctrlKey &&
      e.key.toLowerCase() === "p" &&
      ["login_password", "register_password", "register_retype"].includes(step)
    ) {
      setShowPassword((prev) => !prev);
      e.preventDefault();
      return;
    }

    // Ctrl+C cancel
    if (
      e.ctrlKey &&
      e.key.toLowerCase() === "c" &&
      step !== "choose" &&
      step !== "banner" &&
      step !== "loading"
    ) {
      setLogs((prev) => [...prev, "^C", "Process cancelled."]);
      resetAuth();
      e.preventDefault();
      return;
    }

    // Command history navigation
    if (e.key === "ArrowUp") {
      if (history.length > 0) {
        const newIndex = Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
      return;
    }
    if (e.key === "ArrowDown") {
      if (history.length > 0) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex] || "");
      }
      return;
    }

    // Backspace
    if (e.key === "Backspace") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    // Enter
    if (e.key === "Enter") {
      const trimmed = input.trim();
      if (trimmed) {
        setHistory((prev) => [...prev, trimmed]);
        setHistoryIndex(history.length + 1);
      }

      // Pre-login commands
      if (step === "choose") {
        if (trimmed.toLowerCase() === "login") {
          setMode("login");
          setStep("login_username");
          setLogs((prev) => [...prev, "> login", "You chose LOGIN", "Enter your username:"]);
        } else if (trimmed.toLowerCase() === "register") {
          setMode("register");
          setStep("register_email");
          setLogs((prev) => [
            ...prev,
            "> register",
            "You chose REGISTER",
            "Enter your email:",
          ]);
        } else if (trimmed.toLowerCase() === "help") {
          showHelp();
        } else if (trimmed.toLowerCase() === "clear") {
          setLogs([]);
        } else {
          setLogs((prev) => [...prev, `bash: command not found: ${trimmed}`]);
        }
        setInput("");
        return;
      }

      // LOGIN FLOW
      if (step === "login_username") {
        setUsername(trimmed);
        setLogs((prev) => [...prev, `> username: ${trimmed}`, "Enter your password:"]);
        setStep("login_password");
        setInput("");
        return;
      }

      if (step === "login_password") {
        setPassword(trimmed);
        setLogs((prev) => [
          ...prev,
          `> password: ${showPassword ? trimmed : "*".repeat(trimmed.length)}`,
          "Authenticating...",
        ]);
        setStep("loading");
        setInput("");

        handleLogin({ username, password: trimmed })
          .then((userData) => {
            const now = new Date().toLocaleString();
            setLastLogin(now);
            showSuccessBanner(userData.name, now);
          })
          .catch(() => {
            setLogs((prev) => [...prev, "Incorrect username or password ❌"]);
            setStep("login_username");
          });
        return;
      }

      // REGISTRATION FLOW
      if (step === "register_email") {
        setEmail(trimmed);
        setLogs((prev) => [...prev, `> email: ${trimmed}`, "Enter your name:"]);
        setStep("register_name");
        setInput("");
        return;
      }

      if (step === "register_name") {
        setName(trimmed);
        setLogs((prev) => [...prev, `> name: ${trimmed}`, "Enter password:"]);
        setStep("register_password");
        setInput("");
        return;
      }

      if (step === "register_password") {
        setPassword(trimmed);
        setLogs((prev) => [
          ...prev,
          `> password: ${"*".repeat(trimmed.length)}`,
          "Confirm password:",
        ]);
        setStep("register_retype");
        setInput("");
        return;
      }

      if (step === "register_retype") {
        setRetypePassword(trimmed);
        if (trimmed !== password) {
          setLogs((prev) => [
            ...prev,
            "Passwords do not match! Try again.",
            "Enter password:",
          ]);
          setPassword("");
          setStep("register_password");
          setInput("");
          return;
        }
        setLogs((prev) => [...prev, "Registering..."]);
        setStep("loading");
        setInput("");

        handleRegister({ email, name, password })
          .then(() => {
            setLogs((prev) => [
              ...prev,
              `User '${email}' registered successfully ✅`,
              "Please login now.",
              "Enter your username:",
            ]);
            setStep("login_username");
          })
          .catch(() => {
            setLogs((prev) => [...prev, "Registration failed ❌. Try again later."]);
            resetAuth();
          });
        return;
      }

      setInput("");
    } else if (e.key.length === 1) {
      setInput((prev) => prev + e.key);
    }
  };

  const showSuccessBanner = (username, lastLogin) => {
    setStep("banner");
    const banner = [
      "  _____ _    _ _ _      ______                      ",
      " / ____| |  | | | |    |  ____|                     ",
      "| (___ | |__| | | |    | |__ ___  _ __ __ _  ___ ___ ",
      " \\___ \\|  __  | | |    |  __/ _ \\| '__/ _` |/ __/ _ \\",
      " ____) | |  | | | |____| | | (_) | | | (_| | (_|  __/",
      "|_____/|_|  |_|_|______|_|  \\___/|_|  \\__,_|\\___\\___|",
      "",
      `Welcome, ${username}!`,
      `Last login: ${lastLogin}`,
      "",
    ];
    setLogs(banner);

    setTimeout(() => {
      navigate("/landing"); // change this route to your landing page
    }, 3000);
  };

  const getPrompt = () => {
    switch (step) {
      case "login_username":
        return "> username: ";
      case "login_password":
      case "register_password":
      case "register_retype":
        return "> password: ";
      case "register_email":
        return "> email: ";
      case "register_name":
        return "> name: ";
      default:
        return "> ";
    }
  };

  const getInputDisplay = () => {
    if (["login_password", "register_password", "register_retype"].includes(step)) {
      return showPassword ? input : "*".repeat(input.length);
    }
    return input;
  };

  return (
    <div
      className="bg-black text-green-500 h-screen w-screen p-4 font-mono text-sm overflow-y-auto relative"
      onClick={() => inputRef.current?.focus()}
      ref={containerRef}
    >
      {logs.map((line, i) => (
        <div key={i} className="whitespace-pre-wrap leading-relaxed">
          {line}
        </div>
      ))}

      {!["loading", "banner"].includes(step) && (
        <div className="flex">
          <span>{getPrompt()}</span>
          <span>{getInputDisplay()}</span>
          <span className="ml-1">{showCursor ? "█" : " "}</span>
        </div>
      )}

      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0"
        autoFocus
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
