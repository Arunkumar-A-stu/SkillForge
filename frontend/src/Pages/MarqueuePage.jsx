import React from 'react'
import LogoGrid from '@/Component/LogoGrid';

function MarqueuePage() {
  return (
    <div className='relative overflow-hidden py-12 w-full'>
      <h3 className="font-semibold text-2xl text-gray-600 text-center px-4 mb-10">
        PRACTICE CODING QUESTIONS FROM TOP COMPANIES
      </h3>
      <LogoGrid from={0} to={"-100%"} />
      <LogoGrid from={"-100%"} to={0} />
    </div>
  );
}

export default MarqueuePage