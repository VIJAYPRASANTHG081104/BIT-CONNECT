import { useState } from "react";
import Footer from "../../components/login/Footer";
import LoginForm from "../../components/login/LoginForm";
import RegisterForm from "../../components/login/RegisterForm";
import "./style.css";
export default function Login() {
  const [visible,setVisible] = useState(false);
  return (
    <div className="login">
        <LoginForm setVisible={setVisible}/>
         {visible &&  <RegisterForm setVisible={setVisible}/> }
    </div>
  );
}
