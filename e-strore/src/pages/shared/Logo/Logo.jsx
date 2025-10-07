import React from 'react'
import logo from "../../../assets/E-Store.png"

const Logo = () => {
  return (
    <div className="h-24 flex items-center">
      <img 
        src={logo} 
        alt="E-Store Logo" 
        className="h-full w-auto object-contain" 
      />
    </div>
  )
}

export default Logo
