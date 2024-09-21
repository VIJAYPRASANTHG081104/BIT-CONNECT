import  axios  from "axios";
import React from "react";
import { Link } from "react-router-dom";

const SendEmail = ({
  userInfo,
  error,
  setError,
  setVisible,
  setUserInfo,
  loading,
  setLoading,
  email,
}) => {
  const SendEmail = async () => {
    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/sendresetpasswordcode`,{
        email
      });
      setError("");
      setLoading(false)
      setVisible(2);
    } catch (error) {
      setLoading(false);
      setError(error.response.data.msg);
    }
  };
  return (
    <div className="reset_form dynamic_height">
      <div className="reset_form_header">Reset Your Password</div>
      <div className="reset_grid">
        <div className="reset_left">
          <div className="reset_form_text">
            how do you want to receive the code for reset your password?
          </div>
          <label htmlFor="email" className="hover1">
            <input type="radio" name="" id="email" checked readOnly />
            <div className="label_col">
              <span>Send code via email</span>
              <span>{userInfo.email}</span>
            </div>
          </label>
        </div>
        <div className="reset_right">
          <img src={userInfo.picture} alt="" />
          <span>{userInfo.email}</span>
          <span>Facebook user</span>
        </div>
        {
          <div className="error_text" style={{
            padding:"10px"
          }}>
            {error}
          </div>
        }
        <div className="reset_form_btns">
          <Link to={"/login"} className="gray_btn">
            Not you?
          </Link>
          <button
            type="submit"
            className="blue_btn"
            onClick={() => SendEmail()}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendEmail;
