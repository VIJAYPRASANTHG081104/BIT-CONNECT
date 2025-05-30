import React from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import LoginInput from "../../components/inputs/loginInput";
import { useState } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DotLoader from "react-spinners/DotLoader";
import logo from "../../../public/images/logo.png";

const loginInfos = {
  email: "",
  password: "",
};
const LoginForm = ({ setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(loginInfos);
  const { email, password } = login;
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value });
  };
  const loginValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required.")
      .email("Must be a valid email.")
      .max(100),
    password: Yup.string().required("Password is required"),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const loginSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/login`,
        {
          email: email,
          password: password,
        }
      );
      dispatch({ type: "LOGIN", payload: data });
      Cookies.set("user", JSON.stringify(data));
      navigate("/");
    } catch (error) {
      setLoading(false);
      setError(error.response.data.message);
    }
  };
  return (
    <div>
      <div className="login_wrap">
        <div className="login_1">
          <img src={logo} alt="" />
          <span>
            "BIT Connect helps to bring together people with shared interests
            and a passion for development, fostering collaboration and
            innovation."
          </span>
        </div>
        <div className="login_2">
          <div className="login_2_wrap">
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => loginSubmit()}
            >
              {(formik) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="email"
                    placeholder="Email address or phone number"
                    onChange={handleLoginChange}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleLoginChange}
                    bottom
                  />
                  <button type="submit" className="blue_btn">
                    Log In
                  </button>
                </Form>
              )}
            </Formik>
            <Link to="/reset" className="forgot_password">
              Forgotten password?
            </Link>
            <DotLoader color="#1876f2" loading={loading} size={30} />
            {error && <div className="error_text">{error}</div>}
            <div className="sign_splitter"></div>
            <button
              className="blue_btn open_signup"
              onClick={() => setVisible(true)}
            >
              Create Account
            </button>
          </div>
          <Link to="/" className="sign_extra">
            <b>BIT Connect</b> welcomes you:|
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
