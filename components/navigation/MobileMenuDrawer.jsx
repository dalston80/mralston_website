import { Drawer } from '../Drawer'
import MobileMenu from './MobileMenu'
import logo from '../../public/mralston-logo.svg'
import Image from 'next/image'
import Link from 'next/link'
import SocialLinks from './SocialLinks'

export default function MoibleMenuDrawer({isOpen, onClose, menuItems, socialLinks}) {
    return (
      <Drawer open={isOpen} onClose={onClose} openFrom="left" heading="Menu">
        <div className="flex flex-col items-center h-[90vh]">
          <div className="flex flex-col gap-4 pt-5 items-center">
            <Link href="/">
                <Image priority src={logo} alt="Mr. Alston logo"/>
            </Link>
            <MobileMenu menuItems={menuItems} onClose={onClose}/>
            <SocialLinks socialLinks={socialLinks}/>
          </div>
          
          <div className='mt-auto mb-4'>
            <span className='text-yellow-500'>&copy; mralston.me {new Date().getFullYear()}</span>
          </div>
        </div>
        
      </Drawer>
    )
  }