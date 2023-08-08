'use client'
import { buildMenu } from './buildMenu'

export default function DesktopMenu({menuItems}) {
  return (
    <nav>
        <ul className='main-menu flex flex-col gap-10'>
            {buildMenu(menuItems)}
        </ul>
    </nav>
  )
}
