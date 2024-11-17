import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import LoginInput from "../../components/inputs/loginInput";
import * as Yup from "yup";
import axios from 'axios';
import {useNavigate} from 'react-router-dom'

const ChangePassword = ({
  password,
  setPassword,
  conf_password,
  setConf_password,
  error,
  loading,
  setLoading,
  setVisible,
  setError,
  userInfo
}) => {

  const navigate = useNavigate();
  const validatePassword = Yup.object({
    password: Yup.string()
      // .required(
      //   "Enter a combination of at least six numbers,letters and punctuation marks(such as ! and &)."
      // )
      .min(6, "Password must be atleast 6 characters.")
      .max(36, "Password can't be more than 36 characters"),

     conf_password:Yup.string().required("Confirm Your Password") 
                    .oneOf([Yup.ref("password")],"Password must match")
  });
  const changePassword = async()=>{

    try {
      setLoading(true);
      await axios.post(`${import.meta.env.VITE_API_BACKEND_URL}/changepassword`,{
        email:userInfo.email,
        password
      });
  
      setError("");
      setLoading(false);
      navigate('/');
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  }
  return (
    <div className="reset_form" style={{ height: "310px" }}>
      <div className="reset_form_header">Change Password</div>
      <div className="reset_form_text">Pick a strong password</div>
      <Formik
        enableReinitialize
        initialValues={{
          password,
          conf_password,
        }}
        validationSchema={validatePassword}
        onSubmit={()=>changePassword()}
      >
        {(formik) => (
          <Form>
            <LoginInput
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
            />
            <LoginInput
              type="password"
              name="conf_password"
              onChange={(e) => setConf_password(e.target.value)}
              placeholder="Confirm New Password"
              bottom={true}
            />
            {error && <div className="error_text">{error}</div>}
            <div className="reset_form_btns">
              <Link to="/login" className="gray_btn">
                Cancel
              </Link>
              <button type="submit" className="blue_btn">
                Continue
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangePassword;
