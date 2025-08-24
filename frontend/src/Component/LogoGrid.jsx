import React from 'react'
import { motion } from "motion/react"

export default function LogoGrid({from, to}) {

    const upperMarque = ["/1.svg",
        "/2.svg",
        "/3.svg",
        "/4.svg",
        "/5.svg",
        "/6.svg",
        "/7.svg",
        "/8.svg",
        "/9.svg",
        "/10.svg",
        "/11.svg",
        "/12.svg",
        "/13.svg",
        "/14.svg"
    ];

    return (
      <div className="w-full overflow-hidden py-6">
        <div className="flex MyGradient gap-16">
          <motion.div
            initial={{ x: `${from}` }}
            animate={{ x: `${to}` }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0 gap-10"
          >
            {upperMarque.map((image, index) => {
              return (
                <img key={index} src={image} className="h-30 w-auto sm:h-16 md:h-20 object-contain" />
              );
            })}
          </motion.div>

          <motion.div
            initial={{ x: `${from}` }}
            animate={{ x: `${to}` }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="flex flex-shrink-0 gap-10"
          >
            {upperMarque.map((image, index) => {
              return (
                <img key={index} src={image} className="h-30 w-auto sm:h-16 md:h-20 object-contain" />
              );
            })}
          </motion.div>
        </div>
      </div>
    );
}
