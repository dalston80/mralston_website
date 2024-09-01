'use client'

import DesktopHeader from "./DesktopHeader"
import { useDrawer } from "./Drawer"
import MobileHeader from "./MobileHeader"
import MoibleMenuDrawer from "./navigation/MobileMenuDrawer"

export default function Header({title, menuItems, socialLinks}) {
    const {isOpen: isMenuOpen, openDrawer: openMenu, closeDrawer: closeMenu} = useDrawer()
    
    return (
      <>
          {menuItems && (<MoibleMenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menuItems={menuItems} socialLinks={socialLinks}/>)}
          <DesktopHeader menuItems={menuItems} title={title} socialLinks={socialLinks} />
          <MobileHeader title={title} openMenu={openMenu} />
      </>
    )
  }