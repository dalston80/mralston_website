import React from 'react'
import './global.css'
import Header from '../components/Header'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getProfile } from '../sanity/lib/query'

export const metadata = {
  title: 'Dennis Alston | Experienced Web Developer | 17+ Years of Expertise',
  description: 'Dennis Alston, a seasoned web developer from Passaic, NJ, with over 17 years of experience. Specializing in diverse technologies and ready to tackle any web development challenge.',
  openGraph: {
      title: 'Dennis Alston | Experienced Web Developer | 17+ Years of Expertise',
      description: 'Dennis Alston, a seasoned web developer from Passaic, NJ, with over 17 years of experience. Specializing in diverse technologies and ready to tackle any web development challenge.',
      url: 'https://mralston.me',
      siteName: 'Mr. Alston',
      images: [
          {
              url: 'https://mralston.me/mralston-logo-new.png',
              width: 164,
              height: 136,
          },
      ],
      locale: 'en-US',
      type: 'website',
  }
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
    {
      id: 3,
        url: '#projects',
        title: 'Projects'
    }
  ]

  const profile = await getProfile()
  
  return (
    <html lang='en' className="scroll-smooth">
        <body className='font-sans'>
          <div className='body-background w-full h-screen fixed z-0'/>
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
