const FAQSection = ({profile}) => {
  const person = profile?.[0]
  if (!person) return null

  const skillsList = person.skills?.length > 0 ? person.skills.join(', ') : null

  const faqs = [
    {
      question: 'Who is Dennis Alston?',
      answer: `Dennis Alston is a web developer based in ${person.location || 'New Jersey'} with over 17 years of experience building web applications across a wide range of technologies.`,
    },
    ...(skillsList ? [{
      question: 'What technologies does Dennis Alston work with?',
      answer: `Dennis works with ${skillsList}, and has applied these across full-stack web development, front-end engineering, and platform integration projects.`,
    }] : []),
    {
      question: 'What kind of projects has Dennis Alston worked on?',
      answer: 'Dennis has worked on full-stack web applications, front-end interfaces for financial services and media platforms, and custom UI component libraries, spanning senior engineering and application development roles.',
    },
    ...(person.email ? [{
      question: 'How can I contact Dennis Alston?',
      answer: `You can reach Dennis by email at ${person.email}, or connect via the social links on this site.`,
    }] : []),
  ]

  return (
    <div className="flex flex-col gap-8">
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">
        Frequently Asked Questions
      </h2>
      <div className="flex flex-col gap-4">
        {faqs.map((faq, i) => (
          <div key={i} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-bold text-blue-950">{faq.question}</h3>
            <p className="mt-2 text-blue-800 max-w-prose">{faq.answer}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </div>
  )
}

export default FAQSection
