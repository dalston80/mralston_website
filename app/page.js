import SkillsList from '../components/home/SkillsList'
import { getProfile } from '../sanity/lib/query'

import HeroSection from '../components/home/HeroSection'
import FAQSection from '../components/home/FAQSection'
import ExperienceDisplay from '../components/experience/ExperienceDisplay'
import Link from 'next/link'
import Projects from '../components/projects/Projects'
import ProductsSection from '../components/products/ProductsSection'
import { productsEnabled } from '../components/products/utils'

export default async function Home() {
  const profile = await getProfile()
  const hasProjects = profile[0].currentProjects?.some(project => project.children?.[0]?.text?.trim())

  return (
    <>
      <section id="home" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24 flex flex-col gap-16">
        <HeroSection profile={profile} />
        <SkillsList profile={profile} />
      </section>
      <section id="experience" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24 flex flex-col gap-8">
        <ExperienceDisplay experienceData={profile[0].experience} />
        <p className="text-base font-bold leading-relaxed text-blue-800 max-w-prose">This is a shorter but more relevant list of my work history. If you would like more details, choose one of the items below.</p>
        <div className="flex flex-col md:flex-row items-center gap-5">
          <Link className="text-gray-100 font-bold bg-blue-950 hover:bg-blue-800 transition-all rounded-lg px-5 py-3" href={profile[0].socialLinks.linkedin}>LinkedIn Profile</Link>
          {profile[0].resumeURL && (
            <Link className="text-gray-100 font-bold bg-blue-950 hover:bg-blue-800 transition-all rounded-lg px-5 py-3" href={profile[0].resumeURL}>Resume</Link>
          )}
        </div>
      </section>
      {productsEnabled && (
        <section id="products" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24">
          <ProductsSection />
        </section>
      )}
      {hasProjects && (
        <section id="projects" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24">
          <Projects currentProjects={profile[0].currentProjects} />
        </section>
      )}
      {profile[0].email && (
        <section id="contact" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24 text-center flex flex-col items-center gap-6">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">Let&apos;s work together</h2>
          <p className="text-lg leading-relaxed text-blue-800 max-w-prose">Have a project in mind or just want to connect? I&apos;d love to hear from you.</p>
          <Link href={`mailto:${profile[0].email}`} className="text-blue-950 font-bold bg-yellow-500 hover:bg-yellow-400 transition-all rounded-lg px-6 py-3">
            {profile[0].email}
          </Link>
        </section>
      )}
      <section id="faq" className="max-w-7xl mx-auto lg:px-16 px-6 py-16 lg:py-24">
        <FAQSection profile={profile} />
      </section>
    </>
  )
}
