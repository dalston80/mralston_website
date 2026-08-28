'use client'
import DesktopMenu from './navigation/DesktopMenu'
import logo from '../public/mralston-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import SocialLinks from './navigation/SocialLinks'

export default function DesktopHeader({title, menuItems, socialLinks}) {
  return (
    <header
          role="banner"
          className={`hidden lg:flex flex-col items-center max-w-xs w-80 bg-blue-950 sticky top-0 z-50 h-screen leading-none gap-4 antialiased transition overflow-hidden`}
    >
      <div className="flex flex-col gap-4 pt-5 items-center">
        <div className="flex gap-12 pt-5">
            <Link className="font-bold" href="/">
                <Image priority src={logo} alt={title}/>
            </Link>
        </div>
        <DesktopMenu menuItems={menuItems}/>
        <SocialLinks socialLinks={socialLinks}/>
      </div>
        
      <div className='mt-auto mb-4'>
        <span className='text-yellow-500'>&copy; mralston.me {new Date().getFullYear()}</span>
      </div>
    </header>
  )
}
