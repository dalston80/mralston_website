import SkillsList from '../components/home/SkillsList'
import { getProfile } from '../sanity/lib/query'

import HeroSection from '../components/home/HeroSection'
import ExperienceDisplay from '../components/experience/ExperienceDisplay'
import Link from 'next/link'
import Projects from '../components/projects/Projects'

export const metadata = {
    title: 'Home Page',
}

export default async function Home() {
  const profile = await getProfile()
  
  return (
    <>
      <section id="home" className="max-w-7xl mx-auto lg:px-16 px-6 xl:mt-80 mb-40 lg:mb-[600px]">
        <HeroSection profile={profile} />
        <SkillsList profile={profile} />
      </section>
      <section id="experience" className="max-w-7xl mx-auto xl:h-screen lg:px-16 px-6 mb-40 lg:mb-80">
        <ExperienceDisplay experienceData={profile[0].experience} />
        <p className="text-base font-bold leading-relaxed text-blue-800 mb-3">This is a shorter but more relevant list of my work history. If you would like more details, choose one of the items below.</p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link className="text-gray-100 font-bold bg-blue-950 hover:bg-blue-800 transition-all rounded-lg p-3" href={profile[0].socialLinks.linkedin}>LinkedIn Profile</Link>
          <Link className="text-gray-100 font-bold bg-blue-950 hover:bg-blue-800 transition-all rounded-lg p-3" href={profile[0].resumeURL || ''}>Resume</Link>
        </div>
      </section>
      <section id="projects" className="max-w-7xl mx-auto lg:h-[50vh] lg:px-16 px-6 mb-40 lg:mt-56 lg:mb-80">
        <Projects currentProjects={profile[0].currentProjects} />
      </section>
    </>
  )
}
