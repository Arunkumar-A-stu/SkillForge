import React from 'react'
import HeroSection from './HeroSection'
import FeatureSection from './FeatureSection'
import StatsSection from './StatsSection'
import LogoGrid from '@/Component/LogoGrid';
import ProfileDropDown from '@/Component/ProfileDropDown';

export default function LandingPage() {
  return (
    <>
      <div className='relative h-full'>
        {/* <section className='h-screen w-full'>
          <div className='w-full h-full'>
            <ProfileDropDown />
          </div>
        </section> */}
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
