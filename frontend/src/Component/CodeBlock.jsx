import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform } from "motion/react";

export default function CodeBlock({  }) {
  const [language, setLanguage] = useState("java");
  const [typedCode, setTypedCode] = useState("");
  const codeRef = useRef(null);


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


  return (
    <div
      className="bg-black rounded-2xl shadow-[0_0_25px_#00ff9f55] overflow-hidden w-full max-w-2xl mx-auto"
    >
      {/* Header */}
      <div
        className="bg-[#0d0d0d] flex items-center justify-between px-4 py-2 border-b border-[#00ff9f22]"
      >
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="w-3 h-3 bg-yellow-500 rounded-full" />
          <span className="w-3 h-3 bg-green-500 rounded-full" />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-black border border-[#00ff9f55] text-[#00ff9f] text-sm rounded px-2 py-1 font-mono hover:bg-[#00ff9f11] transition"
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
            <option value="java">Java</option>
          </select>
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
