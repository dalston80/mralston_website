'use client'

import { Inter } from 'next/font/google'
import IconStyler from '../IconStyler'
import { IconMap } from '../../helpers/IconMap'

const inter = Inter({ subsets: ['latin'] })

export default function SkillsList({profile}) {
   
   return (
      <section>
        {profile && profile.map((data) => (
          <div key={data._id} className='grid grid-cols-skills-list gap-y-6'>
            {data.skills.map((skill, idx) => (
              <div key={skill+idx} className='flex flex-col items-center justify-center gap-x-2 gap-y-2'>
                <IconStyler className="text-blue-800 text-5xl">
                  {IconMap[skill].icon}
                </IconStyler>
                <span className="text-blue-800">{skill}</span>
              </div>
            ))}
          </div>
        ))}
      </section>
    )
  }