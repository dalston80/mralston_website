import Image from 'next/image'

const HeroSection = ({profile}) => {
  return (
    <section className="flex lg:flex-row flex-col lg:items-center items-start lg:justify-center justify-between gap-x-12 lg:mt-32 mt-20 mb-16">
        {profile &&
          profile.map((data) => (
            <div key={data._id} className='flex flex-auto gap-12'>
              <div className='flex flex-col items-center justify-center gap-y-5 md:gap-y-10'>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl mb-6 lg:leading-[3.7rem] leading-tight text-blue-950">
                  {data.headline}
                </h1>
                <Image src={data.profileImage.image} alt={data.profileImage.alt} width={250} height={250} className="md:hidden lg:hidden xl:hidden rounded-full w-48 h-48 mb-6 object-none border border-blue-950"/>
                <Image src={data.profileImage.image} alt={data.profileImage.alt} width={500} height={500} className="hidden md:block lg:block xl:hidden rounded-full w-96 h-96 mb-6 object-none border border-blue-950"/>
                <p className="text-base leading-relaxed text-blue-800">
                  {data.shortBio}
                </p>
              </div>
              
              <Image src={data.profileImage.image} alt={data.profileImage.alt} width={500} height={500} className="hidden xl:block rounded-full w-96 h-96 object-none border border-blue-950"/>
            </div>
          ))}
      </section>
  )
}

export default HeroSection