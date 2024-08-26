
import Link from "next/link"
import { useRouter } from "next/navigation"
import { root } from "postcss"
import { useEffect, useState } from "react"

export const buildMenu = (menuItems) => {
    const router = useRouter()
    let [activeSection, setActiveSection] = useState('')
    //let [menuItemClicked, setMenuItemClicked] = useState(false)

    const jumpToHash = (hash) => {
        router.push(hash)
        // setMenuItemClicked(true)
        // setTimeout(() => {
        //     setMenuItemClicked(false)
        // }, 500)
        setActiveSection(hash)
    }

    // useEffect(() => {

    //     const observerOptions = {
    //         root: null,
    //         rootMargin: '0px',
    //         threshold: 0.2
    //     }
        
    //     const sections = document.querySelectorAll('section')

    //     const observer = new IntersectionObserver((entries, observer) => {
            
    //         entries.forEach(entry => {
    //             if (entry.isIntersecting) {
    //                 jumpToHash(`#${entry.target.id}`)
    //                 //setActiveSection(`#${entry.target.id}`)
    //             }
    //         })
            
    //     }, observerOptions)

    //     if (!menuItemClicked) {
    //         sections.forEach(section => {
    //             if (section.id) {
    //                 observer.observe(section)
    //             }
    //         })
    //     } else {
    //         sections.forEach(section => {
    //             if (section.id) {
    //                 observer.unobserve(section)
    //             }
    //         })
    //     }
        
    // }, [])
    
    return menuItems.map((menuItem) => {
        let submenu = null
        let url = menuItem.url
        let submenuItems = menuItem.items
        //activeSection = menuItem.url.startsWith('#') ? (menuItem.url === location.hash) : (menuItem.url === pathname)

        if (submenuItems && submenuItems.length > 0) {
            submenu = (<ul className="sub-menu">{buildMenu(submenuItems)}</ul>)
        }

        return (
            <li key={menuItem.id} className="menu-item">
                <button onClick={(e) => {e.preventDefault(); jumpToHash(menuItem.url)}} className={`text-gray-100 ${menuItem.url === activeSection ? 'text-yellow-500' : 'text-gray-100'} text-xl hover:text-yellow-500 transition-all duration-300`}>{menuItem.title}</button>
                {submenu}
            </li>
        )
    })
}