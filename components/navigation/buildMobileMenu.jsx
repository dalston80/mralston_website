import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export const buildMobileMenu = (menuItems, onClose) => {
    const router = useRouter()
    let [activeSection, setActiveSection] = useState('')

    const jumpToHash = (hash) => {
        router.push(hash)
        // setMenuItemClicked(true)
        // setTimeout(() => {
        //     setMenuItemClicked(false)
        // }, 500)
        setActiveSection(hash)
        onClose()
    }
    
    return menuItems.map((menuItem) => {
        let submenu = null
        let url = menuItem.url
        let submenuItems= menuItem.items

        if (submenuItems && submenuItems.length > 0) {
            submenu = (<ul className="sub-menu">{buildMobileMenu(submenuItems, onClose)}</ul>)
        }

        return (
            <li key={menuItem.id} className="menu-item">
                {/* <Link href={url} onClick={onClose} className="text-white hover:text-yellow-500 transition-all duration-300">{menuItem.title}</Link> */}
                <button onClick={(e) => {e.preventDefault(); jumpToHash(menuItem.url)}} className={`text-gray-100 ${menuItem.url === activeSection ? 'text-yellow-500' : 'text-gray-100'} text-xl hover:text-yellow-500 transition-all duration-300`}>{menuItem.title}</button>
                {submenu}
            </li>
        )
    })
}