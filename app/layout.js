import React from 'react'
import './global.css'
import { Inter, Space_Grotesk } from 'next/font/google'
import Header from '../components/Header'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getProfile } from '../sanity/lib/query'
import { productsEnabled } from '../components/products/utils'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700'],
})

const title = 'Dennis Alston | Experienced Web Developer | 17+ Years of Expertise'
const description = 'Dennis Alston, a seasoned web developer from Passaic, NJ, with over 17 years of experience. Specializing in diverse technologies and ready to tackle any web development challenge.'

export const metadata = {
  metadataBase: new URL('https://mralston.me'),
  title,
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
      title,
      description,
      url: 'https://mralston.me',
      siteName: 'Mr. Alston',
      locale: 'en-US',
      type: 'website',
  },
  twitter: {
      card: 'summary_large_image',
      title,
      description,
  },
}

export default async function RootLayout({children}) {
  const menuItems = [
    {
        id: 1,
        url: '#home',
        title: 'Home'
    },
    {
      id: 2,
        url: '#experience',
        title: 'Experience'
    },
    ...(productsEnabled ? [{
      id: 3,
        url: '#products',
        title: 'Products'
    }] : []),
    {
      id: 4,
        url: '#projects',
        title: 'Projects'
    }
  ]

  const profile = await getProfile()
  const person = profile?.[0]
  const personJsonLd = person ? {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: person.fullName,
    jobTitle: 'Web Developer',
    description: person.shortBio,
    url: 'https://mralston.me',
    image: person.profileImage?.image,
    address: person.location ? {
      '@type': 'PostalAddress',
      addressLocality: person.location,
    } : undefined,
    email: person.email,
    sameAs: person.socialLinks ? Object.values(person.socialLinks).filter(Boolean) : undefined,
    knowsAbout: person.skills,
  } : null

  return (
    <html lang='en' className={`scroll-smooth ${inter.variable} ${spaceGrotesk.variable}`}>
        <body className='font-sans'>
          {personJsonLd && (
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
            />
          )}
          <div className='body-background w-full h-screen fixed -z-10 pointer-events-none'/>
          <main className="flex flex-col lg:flex-row">
            <Header title={'Mr. Alston'} menuItems={menuItems} socialLinks={profile[0].socialLinks} />
            <div>
              {children}  
            </div>
          </main>
        </body>
        <GoogleAnalytics gaId={process.env.GAID || ""}/>  
    </html>
  )
}
