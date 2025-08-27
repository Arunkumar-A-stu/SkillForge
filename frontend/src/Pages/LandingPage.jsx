import React, { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThemeToggle from "@/Component/ThemeToggle";
import CodeBlock from "@/Component/CodeBlock";
import { useNavigate } from "react-router-dom";

// ------------------- Hero Section -------------------
const HeroSection = () => {
  const [text, setText] = useState("");
  const message = "Welcome to SkillForge_";
  const [index, setIndex] = useState(0);

  // Typing effect for hero title
  useEffect(() => {
    if (index < message.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + message[index]);
        setIndex(index + 1);
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [index]);

  const navigate = useNavigate();

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-[#0d0d0d] overflow-hidden text-[#00ff9f]">
      <div className="absolute flex gap-4 top-4 right-4 z-10">
        <ThemeToggle />
            <button className="px-6 py-3 border border-[#00ff9f] text-[#00ff9f] rounded-lg font-mono hover:bg-[#00ff9f] hover:text-black transition shadow-[0_0_15px_#00ff9f]" onClick={() => {
              navigate("/auth");
            }}>
              $ login
            </button>
      </div>

      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff9f0a_1px,transparent_1px),linear-gradient(to_bottom,#00ff9f0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      {/* Floating Code Symbols */}
      <motion.div
        className="absolute top-20 left-1/3 text-6xl font-mono text-[#08fdd8] opacity-20"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 8, repeat: Infinity }}
      >
        {"{"}
      </motion.div>
      <motion.div
        className="absolute bottom-24 right-1/4 text-6xl font-mono text-[#ff3c7e] opacity-20"
        animate={{ y: [0, -30, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      >
        {"</>"}
      </motion.div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Left Side */}
        <div className="space-y-6 font-mono">
          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {text}
            <span className="animate-pulse">|</span>
          </motion.h1>

          <motion.p
            className="text-lg text-[#08fdd8] max-w-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Forge your coding skills by solving challenges from top companies.
            <br />
            Prepare smarter, faster.
          </motion.p>

          <div className="flex gap-4">
            <button className="px-6 py-3 border border-[#00ff9f] text-[#00ff9f] rounded-lg font-mono hover:bg-[#00ff9f] hover:text-black transition shadow-[0_0_15px_#00ff9f]">
              $ get-started
            </button>
          </div>
        </div>

        {/* Right Side - Code Block */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="relative bg-black border border-[#00ff9f33] rounded-2xl p-6 font-mono text-[#00ff9f] shadow-[0_0_25px_#00ff9f55]"
        >
            <CodeBlock />
        </motion.div>
      </div>
    </section>
  );
};

// ------------------- Feature Section -------------------
const FeatureSection = () => {
  const features = [
    { title: "Fast Learning Refresh", desc: "Stay up to date with fresh coding challenges added weekly." },
    { title: "Smart Analytics", desc: "Track your growth with streaks, charts, and company-specific progress." },
    { title: "Secure & Reliable", desc: "Robust encryption, safe storage, and zero distractions." },
    { title: "Build on Your Terms", desc: "Solve in Python, C++, Java, JavaScript, and more." },
    { title: "Distraction-Free", desc: "Ad-free hacker-friendly coding space." },
    { title: "Flexible Learning Path", desc: "From beginner to pro, choose your learning flow." },
  ];

  const { scrollYProgress } = useScroll();

  return (
    <div className="h-[600vh] bg-[#0d0d0d] text-[#00ff9f] font-mono">
      <div className="sticky top-0 h-screen flex">
        {/* Left Side */}
        <div className="w-1/2 flex flex-col justify-center items-start px-16">
          <span className="bg-[#00ff9f] text-black px-4 py-1 rounded-full text-sm font-bold mb-4">
            Why Choose SkillForge?
          </span>
          <h1 className="text-5xl font-bold mb-6 leading-tight">
            Master coding <br /> in terminal style
          </h1>
          <p className="text-lg text-[#08fdd8] leading-relaxed">
            Features designed for modern learners — hacker-inspired, but interview-ready.
          </p>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex justify-center items-center relative overflow-hidden">
          <div className="relative w-full max-w-lg h-[400px]">
            {features.map((feature, i) => {
              const start = i / features.length;
              const end = (i + 1) / features.length;

              const y = useTransform(scrollYProgress, [start, end], [400, -400]);
              const opacity = useTransform(
                scrollYProgress,
                [start, start + 0.05, end - 0.05, end],
                [0, 1, 1, 0]
              );

              return (
                <motion.div
                  key={i}
                  style={{ y, opacity }}
                  className="absolute inset-0 rounded-xl overflow-hidden shadow-[0_0_20px_#00ff9f44] bg-black border border-[#00ff9f33]"
                >
                  {/* Code Block Header */}
                  <div className="flex items-center h-10 px-4 bg-[#0d0d0d] border-b border-[#00ff9f22]">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <span className="ml-4 text-md text-[#08fdd8]">
                      {feature.title.replace(/\s+/g, "-").toLowerCase()}.js
                    </span>
                  </div>

                  {/* Code Content */}
                  <div className="p-6 text-lg">
                    <span className="text-[#00ff9f]">// {feature.title}</span>
                    <br />
                    <span className="text-[#08fdd8]">function</span>{" "}
                    <span className="text-[#ff3c7e]">
                      {feature.title.replace(/\s+/g, "")}
                    </span>
                    {"() {"}
                    <br />
                    <span className="ml-6 text-[#08fdd8]">
                      // {feature.desc}
                    </span>
                    <br />
                    {"}"}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------- Landing Page -------------------
function LandingPage() {
  return (
    <div>
      <HeroSection />
      <FeatureSection />
    </div>
  );
}

export default LandingPage;
