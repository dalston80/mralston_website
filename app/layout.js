import React from 'react'
import './global.css'
import Header from '../components/Header'

export const metadata = {
    title: 'Home',
    description: 'Welcome to Next.js',
}

export default function RootLayout({children}) {
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

  return (
    <html lang='en' className="scroll-smooth">
        <body className='font-sans'>
          <div className='body-background w-full h-screen fixed z-0'/>
          <main className="flex flex-col lg:flex-row">
            <Header title={'Mr. Alston'} menuItems={menuItems} />
            <div>
              {children}  
            </div>
          </main>
        </body>
    </html>
  )
}
