'use client'

import Link from "next/link"

export const buildMenu = (menuItems) => {
    return menuItems.map((menuItem) => {
        let submenu = null
        let url = menuItem.url
        let submenuItems = menuItem.items

        if (submenuItems && submenuItems.length > 0) {
            submenu = (<ul className="sub-menu">{buildMenu(submenuItems)}</ul>)
        }

        return (
            <li key={menuItem.id} className="menu-item">
                <Link href={url} className="text-white hover:text-yellow-500 transition-all duration-300">{menuItem.title}</Link>
                {submenu}
            </li>
        )
    })
}