'use client'

import DesktopHeader from "./DesktopHeader"

export default function Header({title, menuItems}) {
    //const {isOpen: isMenuOpen, openDrawer: openMenu, closeDrawer: closeMenu} = useDrawer()
    
    return (
      <>
          
          {/* {menuItems && (<MoibleMenuDrawer isOpen={isMenuOpen} onClose={closeMenu} menuItems={menuItems}/>)} */}
  
          <DesktopHeader menuItems={menuItems} title={title} />
          {/* <MobileHeader title={title} openMenu={openMenu} openCart={openCart} /> */}
      </>
    )
  }