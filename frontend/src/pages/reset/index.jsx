import React, { useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import SearchAccount from "./SearchAccount";
import SendEmail from "./SendEmail";
import Footer from "../../components/login/Footer";
import CodeVerification from "./CodeVerification";
import ChangePassword from "./ChangePassword";
import PropagateLoader from "react-spinners/PropagateLoader";
const Reset = () => {
  const [userInfo, setUserInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(0);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch({ type: "LOGOUT" });
    Cookies.set("user", null);
    navigate("/login");
  };
  return (
    <div className="reset">
      <div className="reset_header">
        <img src="../../../icons/facebook.svg" alt="" />
        {user !== null ? (
          <div className="right_reset">
            <Link to={"/profile"}>
              <img src={user.picture} alt="" />
            </Link>
            <button
              className="blue_btn"
              onClick={() => {
                logout();
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link to={"/login"} className="right_reset">
            <button className="blue_btn">Login</button>
          </Link>
        )}
      </div>
      <div className="reset_wrap">
        {visible === 0 && (
          <SearchAccount
            email={email}
            setEmail={setEmail}
            setError={setError}
            error={error}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfo={setUserInfo}
          />
        )}

        {visible === 1 && userInfo && (
          <SendEmail
            user={user}
            email={email}
            userInfo={userInfo}
            setError={setError}
            error={error}
            setLoading={setLoading}
            setVisible={setVisible}
            setUserInfo={setUserInfo}
          />
        )}

        {visible === 2 && (
          <CodeVerification
            user={user}
            code={code}
            setCode={setCode}
            error={error}
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
            userInfo={userInfo}
          />
        )}
        {visible === 3 && (
          <ChangePassword
            password={password}
            conf_password={conf_password}
            setConf_password={setConf_password}
            setPassword={setPassword}
            error={error}
            setVisible={setVisible}
            setLoading={setLoading}
            setError={setError}
            userInfo={userInfo}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Reset;
