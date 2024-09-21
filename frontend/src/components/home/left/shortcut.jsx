import React from 'react'

const Shortcut = ({img,name,link}) => {
  return (
    <a href={link} target='.' rel='noreferrer' className='shortcut_item'>
        <img src={img} alt=''/>
        <span>{name}</span>
    </a>
  )
}

export default Shortcut