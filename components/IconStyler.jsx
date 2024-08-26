'use client'

import { IconContext } from "react-icons";

export default function IconStyler({color, size, className, style, attr, children}) {
  return (
    <IconContext.Provider value={{color: color, size: size, className: className, style: style, attr: attr}}>
        {children}
    </IconContext.Provider>
  )
}