'use client'

import { motion } from "framer-motion"
import Image from 'next/image'

const AnimatedHeroSection = ({profile}) => {

    const headingVariants = {
        hidden: {
            opacity: 0,
            y: -100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: .5,
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.2
            },
        },
    }

    const pVariants = {
        hidden: {
            opacity: 0,
            y: 100,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: .5,
                type: "spring",
                damping: 20,
                stiffness: 100,
                delay: 0.3
            },
        },
    }
  return (
    <section className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className='flex flex-auto gap-12'>
              <div className='flex flex-col items-center justify-center gap-y-5 md:gap-y-10'>
                <motion.h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight text-blue-950" variants={headingVariants} initial='hidden' animate="visible">
                  {data.headline}
                </motion.h1>
                <Image src={data.profileImage.image} alt={data.profileImage.alt} width={250} height={250} className="md:hidden rounded-full w-48 h-48 mb-6 object-none border border-blue-800"/>
                <motion.p className="text-base leading-relaxed text-blue-800" variants={pVariants} initial='hidden' animate="visible">
                  {data.shortBio}
                </motion.p>
              </div>
              
              <Image src={data.profileImage.image} alt={data.profileImage.alt} width={500} height={500} className="hidden md:block rounded-full w-96 h-96 object-none border border-blue-800"/>
            </div>
          ))}
    </section>
  )
}

export default AnimatedHeroSection