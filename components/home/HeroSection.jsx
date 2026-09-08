import Image from 'next/image'
import Link from 'next/link'

const HeroSection = ({profile}) => {
  return (
    <section className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-center justify-between gap-x-12 gap-y-10">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className='flex flex-auto gap-12'>
              <div className='flex flex-col items-center justify-center gap-y-5 md:gap-y-8'>
                <h1 className="text-[clamp(2.25rem,5vw,3.75rem)] font-bold tracking-tight leading-tight text-blue-950">
                  {data.headline}
                </h1>
                <Image src={data.profileImage.image} alt={data.profileImage.alt} width={250} height={250} className="md:hidden lg:hidden xl:hidden rounded-full w-48 h-48 object-cover ring-4 ring-white shadow-xl shadow-blue-950/20"/>
                <Image src={data.profileImage.image} alt={data.profileImage.alt} width={500} height={500} className="hidden md:block lg:block xl:hidden rounded-full w-96 h-96 object-cover ring-4 ring-white shadow-xl shadow-blue-950/20"/>
                <p className="text-lg leading-relaxed text-blue-800 max-w-prose">
                  {data.shortBio}
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {data.email && (
                    <Link href={`mailto:${data.email}`} className="text-blue-950 font-bold bg-yellow-500 hover:bg-yellow-400 transition-all rounded-lg px-6 py-3">
                      Get in touch
                    </Link>
                  )}
                  <Link href="#experience" className="text-blue-950 font-bold border border-blue-200 hover:border-blue-950 transition-all rounded-lg px-6 py-3">
                    View my work
                  </Link>
                </div>
              </div>
              
              <Image src={data.profileImage.image} alt={data.profileImage.alt} width={500} height={500} className="hidden xl:block rounded-full w-96 h-96 object-cover ring-4 ring-white shadow-xl shadow-blue-950/20"/>
            </div>
          ))}
      </section>
  )
}

export default HeroSection