import React, { useState } from "react";
import "./style.css";
import axios from  'axios';
const SendVerification = ({user}) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const sendVerification = async() =>{
        try {
            const {data} = await axios.post(
                `${import.meta.env.VITE_API_BACKEND_URL}/sendverification`,{},
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                        
                    }
                }
            )
            setSuccess(data.message);
            console.log(data.activateLink);
        } catch (error) {
      
            setError(error.respones.data.message);
        }
    }
  return (
    <div className="send_verfication">
      <span>
        Your account is not verified,verify your account before it gets deleted
        after a month from creating.
      </span>
      <a 
        onClick={()=>{
          sendVerification();
        }}
      >click here to resend verification Link</a>
      {success && <div className="success_text">{success}</div>}
      {error && <div className="error_text">{error}</div>}
    </div>
  );
};

export default SendVerification;
