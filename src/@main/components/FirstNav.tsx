import React from 'react'
import { Button } from './Button'

type FirstNavProps = {
  pageName:string
}

const FirstNav = ({pageName}:FirstNavProps) => {
  return (
    <div className="top_nav flex justify-between items-center">
        <div className='flex flex-col items-start'>
            <Button label='< back'/>
            <span className='text-perfGray3 text-sm'>Home / {pageName}</span>
        </div>
        <div className="club_logo">
            <h1>CLUB LOGO</h1>
        </div>
    </div>
  )
}

export default FirstNav;