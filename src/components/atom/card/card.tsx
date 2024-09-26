import React from 'react'

interface CardProps{
    children?: React.ReactNode
    className?:string
}

const Card = ({ children, className}: CardProps) => {
  return (
    <div
    className={` relative bg-white rounded-[10px] text-black  ${className}`}
    data-testid= 'card'
    >
      {children}
    </div>
  )
}

export default Card
