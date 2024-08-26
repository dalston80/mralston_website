import { Drawer } from '../Drawer'
import MobileMenu from './MobileMenu'
import logo from '../../public/mralston-logo.svg'
import Image from 'next/image'

export default function MoibleMenuDrawer({isOpen, onClose, menuItems}) {
    return (
      <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
        <div className="w-full grid justify-center">
          <a href="/">
              <Image priority src={logo} alt="Mr. Alston logo"/>
          </a>
          <MobileMenu menuItems={menuItems} onClose={onClose}/>
        </div>
      </Drawer>
    )
  }