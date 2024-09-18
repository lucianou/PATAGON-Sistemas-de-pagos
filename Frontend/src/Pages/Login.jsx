import React from "react";
import useForm from "../Hooks/loginForm";
import style from "../styles/LoginGeneral.module.css";
import style2 from "../styles/Login.module.css";
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

  const { form, errors, handleChange, handleSubmit } = useForm(initialData);

  return (
    <>
      <div className={style.body}>
        <div className={style.contenedor}>
          {/* <img src={patagonImg} alt="patagon" className={style.logo} /> */}
          <form onSubmit={handleSubmit}>
            <h1>Iniciar Sesión</h1>
            {errors.server && <p className={style2.errorMessage}  >{errors.server}</p>}
            <InputText icon={faEnvelope} id="email" label="Gmail" value={form.email} handleChange={handleChange} />
            <InputPassword id="password" label="Contraseña" value={form.password} handleChange={handleChange} />
            <div className={style2.loginGroup}>
              <div>
                <input id="check" type="checkbox" />
                <label htmlFor="check"> Recordarme</label>
              </div>
              <a href="#" className={style.forgPass}>¿Olvidaste tu contraseña?</a>
            </div>
            <LoginButton text="Ingresar" />
            <p className={style.cuentaText}>
              ¿No tienes cuenta? <a href="/registro">Regístrate</a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;