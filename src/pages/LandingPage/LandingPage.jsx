import "./LandingPage.scss";
import { useThemeContext } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import { useState } from "react";
import darkPizza from "../../assets/images/darkMode pizza.png";
import lightPizza from "../../assets/images/lightMode pizza.png";
import SignUpButton from "../../components/SignUpButton/SignUpButton";
import LoginButton from "../../components/LoginButton/LoginButton";
import SwitchComponent from "../../components/SwitchComponent/SwitchComponent";

function LandingPage() {
  const { contextTheme, setContextTheme } = useThemeContext();
  const [checked, setChecked] = useState(true);

  const handleSwitch = (nextChecked) => {
    setContextTheme((state) => (state === "Light" ? "Dark" : "Light"));
    setChecked(nextChecked);
  };

  return (
    <>
      <div style={{ position: "absolute", right: "0px" }}>
        <SwitchComponent handleSwitch={handleSwitch} checked={checked} />
      </div>
      <main className="main">
        <img
          className="main__logo"
          src={contextTheme === "Light" ? lightPizza : darkPizza}
        />
      </main>
      <section className="section">
        <Link to="/login" style={{ textDecoration: "none" }}>
          <LoginButton style={"section__buttons"} />
        </Link>
        <Link to="/signUp" style={{ textDecoration: "none" }}>
          <SignUpButton style={"section__buttons"} />
        </Link>
      </section>
    </>
  );
}

export default LandingPage;
