'use client'
import { buildMenu } from './buildMenu'

export default function DesktopMenu({menuItems}) {
  return (
    <nav>
        <ul className='main-menu flex flex-col justify-center items-center gap-5'>
            {buildMenu(menuItems)}
        </ul>
    </nav>
  )
}
