'use client'
import DesktopMenu from './navigation/DesktopMenu'
import logo from '../public/mralston-logo.svg'
import Image from 'next/image'

export default function DesktopHeader({title, menuItems}) {
  return (
    <header
          role="banner"
          className={`hidden lg:flex flex-col items-center max-w-xs w-80 bg-blue-950 sticky top-0 z-50 h-screen leading-none gap-4 antialiased transition overflow-hidden`}
    >
        <div className="flex gap-12 pt-5">
            <a className="font-bold" href="/">
                <Image priority src={logo} alt={title}/>
            </a>
        </div>
        <DesktopMenu menuItems={menuItems}/>
    </header>
  )
}
