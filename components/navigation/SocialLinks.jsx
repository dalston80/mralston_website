import Link from "next/link"
import { IconMap } from "../../helpers/IconMap"
import IconStyler from "../IconStyler"

const SocialLinks = ({socialLinks}) => {

  const socialLinksList = Object.values(socialLinks)
  const socialLinksKeys = Object.keys(socialLinks)

  return (
    <div className="w-20 lg:w-24 mt-20">
        <div className="grid grid-cols-social-links gap-4">
            {socialLinksKeys.map((socialKey, index) => (
                <Link key={index} href={socialLinksList[index]} target="_blank" rel="noopener noreferrer" className="w-8 h-8 text-gray-100 text-3xl font-bold hover:text-yellow-500 transition-all">
                    <IconStyler>
                        {IconMap[socialKey] ? IconMap[socialKey].icon : null}
                    </IconStyler>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default SocialLinks