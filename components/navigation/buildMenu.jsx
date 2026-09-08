import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const flattenSectionIds = (menuItems) => {
    return menuItems.reduce((ids, menuItem) => {
        if (menuItem.url && menuItem.url.startsWith('#')) {
            ids.push(menuItem.url)
        }
        if (menuItem.items && menuItem.items.length > 0) {
            ids.push(...flattenSectionIds(menuItem.items))
        }
        return ids
    }, [])
}

const renderMenu = (menuItems, jumpToHash, activeSection) => {
    return menuItems.map((menuItem) => {
        let submenu = null
        let submenuItems = menuItem.items

        if (submenuItems && submenuItems.length > 0) {
            submenu = (<ul className="sub-menu">{renderMenu(submenuItems, jumpToHash, activeSection)}</ul>)
        }

        return (
            <li key={menuItem.id} className="menu-item">
                <button onClick={(e) => {e.preventDefault(); jumpToHash(menuItem.url)}} className={`text-gray-100 ${menuItem.url === activeSection ? 'text-yellow-500' : 'text-gray-100'} text-xl hover:text-yellow-500 transition-all duration-300`}>{menuItem.title}</button>
                {submenu}
            </li>
        )
    })
}

export const useMenu = (menuItems) => {
    const router = useRouter()
    let [activeSection, setActiveSection] = useState('')

    const jumpToHash = (hash) => {
        router.push(hash)
        setActiveSection(hash)
    }

    useEffect(() => {
        const sectionIds = flattenSectionIds(menuItems)
        const sections = sectionIds
            .map((id) => document.querySelector(id))
            .filter(Boolean)

        if (sections.length === 0) return

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

                if (visible.length > 0) {
                    setActiveSection(`#${visible[0].target.id}`)
                }
            },
            { rootMargin: '-40% 0px -50% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
        )

        sections.forEach((section) => observer.observe(section))
        return () => observer.disconnect()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return renderMenu(menuItems, jumpToHash, activeSection)
}
