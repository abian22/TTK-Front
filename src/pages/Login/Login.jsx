import { useThemeContext } from "../../context/ThemeContext";
import { useState } from "react";
import darkEmail from "../../assets/icons/darkEmail.svg";
import darkPassword from "../../assets/icons/darkPassword.svg";
import darkEye from "../../assets/icons/darkEye.svg";
import google from "../../assets/icons/icons8-google.svg";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./Login.scss";

function Login() {
  const navigate = useNavigate();
  const { contextTheme } = useThemeContext();
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [loginAccount, setLogginAccount] = useState({
    email: "",
    password: "",
  });

  function handlePassword() {
    setIsPassVisible(!isPassVisible);
  }

  async function logAccount() {
    const emailValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    try {
      if (!emailValidation.test(loginAccount.email)) {
        setIsEmailValid(false);
      } else setIsEmailValid(true);

      if (loginAccount.password.trim() === "") {
        setIsPasswordValid(false);
      } else setIsPasswordValid(true);

      const loginResponse = await login({
        email: loginAccount.email,
        password: loginAccount.password,
      });
      localStorage.setItem("token", loginResponse.data.token);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      alert("Any field is invalid");
    }
  }

  return (
    <>
      <div className="signUpContainer ">
        <h2>Login</h2>
      </div>
      <div className="container">
        <form className="formContainer">
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isEmailValid === false ? "red" : "white" }}
            >
              Email
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Example@gmail.com"
              style={{ borderColor: isEmailValid === false ? "red" : "white" }}
              onChange={(e) =>
                setLogginAccount({ ...loginAccount, email: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") logAccount();
              }}
            />
            <img
              className="formContainer__loginLabel--emailIcon"
              src={darkEmail}
              alt="icon"
            />
          </label>
          <label className="formContainer__signUpLabel">
            <div
              className="formContainer__signUpLabel--inputTitle"
              style={{ color: isPasswordValid === false ? "red" : "white" }}
            >
              Password
            </div>
            <input
              className="formContainer__signUpInput"
              placeholder="Your Password..."
              type={isPassVisible ? "" : "password"}
              onClick={handlePassword}
              onChange={(e) =>
                setLogginAccount({ ...loginAccount, password: e.target.value })
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") logAccount();
              }}
              style={{
                marginBottom: "50px",
                borderColor: isEmailValid === false ? "red" : "white",
              }}
            />
            <img
              className="formContainer__loginLabel--passwordIcon"
              src={darkPassword}
              alt="icon"
            />
            <img
              className="formContainer__loginLabel--eyeIcon"
              src={darkEye}
              alt="icon"
            />
          </label>
          <button
            className="formContainer__signUpButton"
            id={contextTheme}
            style={{ marginBottom: "20px" }}
            onClick={(e) => {
              e.preventDefault();
              logAccount();
            }}
          >
            LOGIN
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
            }}
            className="formContainer__signUpButton"
            id={contextTheme}
          >
            <img
              className="formContainer__signUpButton__googleIcon"
              src={google}
            />
            LOGIN WITH GOOGLE
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
