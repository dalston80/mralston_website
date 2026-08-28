'use client'
import { useMenu } from './buildMenu'

export default function DesktopMenu({menuItems}) {
  const menu = useMenu(menuItems)
  return (
    <nav>
        <ul className='main-menu flex flex-col justify-center items-center gap-5'>
            {menu}
        </ul>
    </nav>
  )
}
