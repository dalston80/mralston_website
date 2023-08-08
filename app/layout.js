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
        url: '/',
        title: 'Home'
    }
  ]

  return (
    <html lang='en'>
        <body className='font-sans'>
          <main className="flex flex-col lg:flex-row max-w-xs">
            <Header title={'Mr. Alston'} menuItems={menuItems} />
            <div>
              {children}
            </div>
          </main>
        </body>
    </html>
  )
}
