import React, { useRef, useEffect } from 'react'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import StatsSection from './StatsSection'
import MarqueuePage from './MarqueuePage'
import { motion, useScroll } from "motion/react";
import Lenis from 'lenis';


export default function LandingPage() {

  const heroRef = useRef(null);


    const { scrollY } = useScroll({
      target: heroRef,
      offset: ["start end", "end start"],
    });



    useEffect(() => {
      const lenis = new Lenis()

      function raf(time){
        lenis.raf(time)
        requestAnimationFrame(raf)
      }

      requestAnimationFrame(raf)
    }, [])

  return (
    <>
      <div className="relative overflow-hidden w-full">
        <section ref={heroRef} id="hero" className="min-h-screen w-full">
          <HeroSection scrollY={scrollY} />
        </section>
        <motion.section
          className="relative py-20 px-6 md:px-12 lg:px-20 "
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }} 
        >
          <FeatureSection />
        </motion.section>
        <section className="justify-center items-center mx-auto max-w-[1210px] overflow-x-hidden py-16">
          <MarqueuePage />
        </section>
        <section className="py-20 " id="stats">
          <StatsSection />
        </section>
      </div>
    </>
  );
}
