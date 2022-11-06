import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from './Button'

type FirstNavProps = {
  pageName:string
}

const FirstNav = ({pageName}:FirstNavProps) => {
  return (
    <div className="top_nav flex p-5 bg-fadedGray justify-between items-center">
        <div className='flex flex-col items-start'>
          <Link to={'/home'} >
            <Button label='< back'/>
          </Link>
            <span className='text-perfGray3 text-sm'>Home / {pageName}</span>
        </div>
        <div className="club_logo">
            <h1>CLUB LOGO</h1>
        </div>
    </div>
  )
}

export default FirstNav;