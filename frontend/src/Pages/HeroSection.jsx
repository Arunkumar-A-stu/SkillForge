import { useEffect, useState } from "react";
import { AuroraText } from "@/components/magicui/aurora-text";
import { motion, useTransform } from "motion/react";


import CodeBlock from "@/Component/CodeBlock";

export default ({scrollY}) => {
  const [state, setState] = useState(false);

  const positionX = useTransform(scrollY, [0, window.innerWidth], [0,-window.innerWidth]);
  const scale = useTransform(scrollY, [0, window.innerHeight], [1,0.5]);

  useEffect(() => {
    document.onclick = (e) => {
      const target = e.target;
      if (!target.closest(".menu-btn")) setState(false);
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden ">
      <div className="relative h-full">
        <section className="h-[540px] py-20 ">
          <div className="max-w-screen-xl mx-auto px-4 py-28 gap-12 text-gray-600 overflow-hidden md:px-8 md:flex">
            <motion.div style={{ x: positionX, scale: scale }} className="flex-none space-y-5 max-w-xl">
              <h1 className="text-4xl text-black font-bold sm:text-5xl">
                Forge Your Coding Future
              </h1>
              <h2 className="text-xl text-gray-600 font-bold sm:text-2xl">
                <AuroraText
                  className="text-2xl"
                  colors={["#FF6B00", "#FFD700", "#0057FF"]}
                >
                  SkilForge
                </AuroraText>{" "}
                is your personal coding arena — where you practice, build, and
                grow. Solve real-world challenges, track your progress, and
                sharpen your skills to become interview-ready and
                industry-ready.
              </h2>
              <div className="flex items-center gap-x-3 sm:text-sm">
                <a
                  href="javascript:void(0)"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-white font-medium bg-gray-800 duration-150 hover:bg-gray-700 active:bg-gray-900 rounded-full md:inline-flex"
                >
                  Get started
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="javascript:void(0)"
                  className="flex items-center justify-center gap-x-1 py-2 px-4 text-gray-700 hover:text-gray-900 font-medium duration-150 md:inline-flex"
                >
                  Explore
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </motion.div>
            <div className="flex-1 w-full hidden md:block">
              {/* Replace with your image */}
              <CodeBlock scrollY={scrollY} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
