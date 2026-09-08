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
          className={`hidden lg:flex flex-col items-center w-72 bg-blue-950 sticky top-0 z-50 h-screen leading-none antialiased transition overflow-hidden border-r border-white/5`}
    >
      <div className="pt-10">
        <Link className="font-bold" href="/">
            <Image priority src={logo} alt={title}/>
        </Link>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-10 py-12">
        <DesktopMenu menuItems={menuItems}/>
        <SocialLinks socialLinks={socialLinks}/>
      </div>

      <div className='pb-6'>
        <span className='text-sm text-yellow-500/80'>&copy; mralston.me {new Date().getFullYear()}</span>
      </div>
    </header>
  )
}
