import { useRouter } from "next/navigation"
import { useState } from "react"

const renderMobileMenu = (menuItems, jumpToHash, activeSection) => {
    return menuItems.map((menuItem) => {
        let submenu = null
        let submenuItems= menuItem.items

        if (submenuItems && submenuItems.length > 0) {
            submenu = (<ul className="sub-menu">{renderMobileMenu(submenuItems, jumpToHash, activeSection)}</ul>)
        }

        return (
            <li key={menuItem.id} className="menu-item">
                <button onClick={(e) => {e.preventDefault(); jumpToHash(menuItem.url)}} className={`text-gray-100 ${menuItem.url === activeSection ? 'text-yellow-500' : 'text-gray-100'} text-xl hover:text-yellow-500 transition-all duration-300`}>{menuItem.title}</button>
                {submenu}
            </li>
        )
    })
}

export const useMobileMenu = (menuItems, onClose) => {
    const router = useRouter()
    let [activeSection, setActiveSection] = useState('')

    const jumpToHash = (hash) => {
        router.push(hash)
        setActiveSection(hash)
        onClose()
    }

    return renderMobileMenu(menuItems, jumpToHash, activeSection)
}
