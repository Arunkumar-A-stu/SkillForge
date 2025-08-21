import React from 'react'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import StatsSection from './StatsSection'
import LogoGrid from '@/Component/LogoGrid';

export default function LandingPage() {
  return (
    <>
      <div className='relative h-full'>
        <section id='hero'>
          <HeroSection />
        </section>
        <section id='features'>
          <FeatureSection />
        </section>
      </div>
      <div>
        <section>
            <LogoGrid />
        </section>
        <section className='py-12' id='stats'>
          <StatsSection />
        </section>
      </div>
    </>
  );
}
