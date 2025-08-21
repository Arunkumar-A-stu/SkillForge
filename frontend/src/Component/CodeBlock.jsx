import React, { useEffect, useRef, useState } from "react";
import Prism from "prismjs";

// grammars
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-python";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-java";

import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

const THEME_URLS = {
  light: "https://unpkg.com/prismjs/themes/prism.css",
  dark: "https://unpkg.com/prismjs/themes/prism-okaidia.css",
};

function usePrismTheme(theme) {
  useEffect(() => {
    const id = "prism-theme";
    const href = THEME_URLS[theme] || THEME_URLS.light;
    let link = document.getElementById(id);

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.id = id;
      document.head.appendChild(link);
    }
    link.href = href;
  }, [theme]);
}

export default function CodeBlock() {
  const [language, setLanguage] = useState("java");
  const [theme, setTheme] = useState("light");
  const [typedCode, setTypedCode] = useState("");
  const [copied, setCopied] = useState(false);
  const codeRef = useRef(null);

  usePrismTheme(theme);

  const codeExamples = {
    javascript: `console.log("Hello, World!");`,
    python: `print("Hello, World!")`,
    c: `#include <stdio.h>
int main() {
    printf("Hello, World!\\n");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
    java: `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  };

  // Typing effect + re-highlight on language change
  useEffect(() => {
    const full = codeExamples[language] || "";
    let idx = 0;
    setTypedCode("");

    const interval = setInterval(() => {
      if (idx <= full.length) {
        setTypedCode(full.slice(0, idx));
        idx++;
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [language]);

  // Run Prism highlighting whenever typedCode changes
  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [typedCode, language, theme]);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[language] || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className={` ${
    theme === "dark" ? "bg-[#272822]" : "bg-[#f5f2f0]"
  } rounded-xl shadow-2xl overflow-hidden w-full max-w-2xl mx-auto border`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between px-4 py-2 ${
          theme === "dark" ? "bg-gray-800" : "bg-gray-200"
        }`}
      >
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
            className="px-3 py-1 rounded text-sm bg-gray-600 hover:bg-gray-500 text-white"
          >
            {theme === "light" ? "☀️ Light" :"🌙 Dark"}
          </button>

          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`${
              theme === "dark" ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
            } text-sm rounded px-2 py-1 focus:outline-none`}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>

          <button
            onClick={handleCopy}
            className={`${
              theme === "dark"
                ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                : "bg-gray-300 hover:bg-gray-400 text-gray-800"
            } text-sm px-3 py-1 rounded`}
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code block */}
      <div className="resize-y overflow-auto min-h-[150px] max-h-[500px]">
        <pre className={`line-numbers language-${language} p-4 font-mono text-sm md:text-base`}>
          <code ref={codeRef} className={`language-${language} whitespace-pre-wrap`}>
            {typedCode}
          </code>
          <span className="ml-1 animate-pulse">|</span>
        </pre>
      </div>
    </div>
  );
}
