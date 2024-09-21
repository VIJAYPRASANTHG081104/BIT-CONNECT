import React from 'react'
import PropagateLoader from 'react-spinners/PropagateLoader'

const ActivateForm = ({type,header,loading,text}) => {
  return (
    <div className='blur'>
        <div className='popup'>
            <div className={`popup_header ${type==='success'? "success_text":"error_text"}`}>
                {header}
            </div>
            <div className='popup_header'>
                {text}
            </div>
            <PropagateLoader color='#1876f2' size={30} loading={loading}/>
        </div>
    </div>
  )
}

export default ActivateForm