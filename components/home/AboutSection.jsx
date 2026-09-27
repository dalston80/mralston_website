import { PortableText } from 'next-sanity'

const portableTextComponents = {
  block: {
    normal: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
  },
}

const AboutSection = ({profile}) => {
  const person = profile?.[0]
  if (!person?.fullBio || person.fullBio.length === 0) return null

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">
        About Dennis Alston
      </h2>
      <div className="text-blue-800 leading-relaxed max-w-prose">
        <PortableText value={person.fullBio} components={portableTextComponents} />
      </div>
    </div>
  )
}

export default AboutSection
