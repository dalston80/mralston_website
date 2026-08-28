import { useMobileMenu } from './buildMobileMenu'

export default function MobileMenu({menuItems, onClose}) {
    const menu = useMobileMenu(menuItems, onClose)
    return (
      <nav>
          <ul className='moible-menu flex items-center justify-center flex-col gap-5 px-6 pt-6'>
              {menu}
          </ul>
      </nav>
    )
  }