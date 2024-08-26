
import { FaSearch, FaBars, FaUser, FaShoppingCart } from 'react-icons/fa'
import Link from "next/link"
import IconStyler from './IconStyler'


export default function MobileHeader({title, openMenu}) {

//   const params = useParams()

  return (
    <header className="lg:hidden flex sticky h-nav top-0 z-40 items-center justify-between w-full bg-blue-950 backdrop-blur-lg leading-none gap-4 px-4 md:px-8">
        <div className='flex items-center justify-start w-full gap-4'>
          <button className="relative flex items-center justify-center w-8 h-8" onClick={openMenu}>
            <IconStyler className={"text-white"}>
              <FaBars />
            </IconStyler>
            
          </button>

        </div>

        <Link
          className="text-yellow-500 flex items-end leading-[3rem] md:leading-[4rem] justify-end flex-grow w-full h-full"
          href="/"
        >
          {title}
        </Link>

    </header>
  )
}
