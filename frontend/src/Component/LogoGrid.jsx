import React from 'react'
import Google from '/google-icon-logo-svgrepo-com.svg'
import Amazon from '/amazon-2-logo-svgrepo-com.svg'
import Apple from '/apple-black-logo-svgrepo-com.svg'
import Microsoft from '/microsoft-logo-svgrepo-com.svg'
import Samsung from '/samsung-logo-svgrepo-com.svg'
import Netflix from '/netflix-2-logo-svgrepo-com.svg'
import Sony from '/sony-2-logo-svgrepo-com.svg'

export default function LogoGrid() {
    return (
        <div className="py-18 items-center justify-center h-[300px] bg-gray-100">
            <div className="max-w-screen-xl mx-auto px-4 md:px-8">
                <h3 className="font-semibold text-sm text-gray-600 text-center p-4">
                    PRACTICE CODING QUESTIONS FROM TOP COMPANIES
                </h3>
                <div className="mt-6">
                    <ul className="flex gap-y-6 flex-wrap items-center justify-center [&>*]:px-12 lg:divide-x">
                        {/* LOGO 1 */}
                        <li className="flex-none">
                            <img src={Google} alt="Google Logo" className="w-12" />
                        </li>

                        {/* LOGO 2 */}
                        <li className="flex-none">
                            <img src={Amazon} alt="Amazon Logo" className="w-18" />
                        </li>

                        {/* LOGO 3 */}
                        <li className="flex-none">
                            <img src={Microsoft} alt="Microsoft Logo" className="w-18" />
                        </li>

                        {/* LOGO 4 */}
                        <li className="flex-none">
                            <img src={Apple} alt="Apple Logo" className="w-18" />
                        </li>

                        {/* LOGO 5 */}
                        <li className="flex-none">
                            <img src={Samsung} alt="Samsung Logo" className="w-18" />
                        </li>

                        {/* LOGO 6 */}
                        <li className="flex-none">
                            <img src={Netflix} alt="Netflix Logo" className="w-18" />
                        </li>

                        {/* LOGO 7 */}
                        <li className="flex-none">
                            <img src={Sony} alt="Sony Logo" className="w-18" />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
