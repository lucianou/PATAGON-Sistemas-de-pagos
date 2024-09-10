import React from "react";
import useForm from "../Hooks/loginForm";
import "../styles/Login.css";
import LoginButton from "../../public/Components/loginButton/loginButton";
import InputPassword from "../../public/Components/InputPassword/inputPassword";
import InputText from "../../public/Components/InputText/inputText";
import patagonImg from "../assets/patagon-logo-text-color.png";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const initialData = {
    email: "",
    password: "",
  };

  const [form, errors, handleChange, handleSubmit] = useForm(initialData);

  return (
    <>
      {/* <img src={patagonImg} alt="patagon" className='logo'/> */}
      <div className="login">
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          {errors.server && <p style={{ color: "red" }}>{errors.server}</p>}
          <InputText
            icon={faEnvelope}
            id="email"
            label="Gmail"
            value={form.email}
            handleChange={handleChange}
          />
          <InputPassword
            id="password"
            label="Contraseña"
            value={form.password}
            handleChange={handleChange}
          />
          <div className="login-group">
            <div>
              <input id="check" type="checkbox" />
              <label htmlFor="check"> Recordarme</label>
            </div>
            <a href="#" className="forg-pass">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <LoginButton text="Ingresar" />
          <p className="registro">
            ¿No tienes cuenta? <a href="/registro">Regístrate</a>
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
