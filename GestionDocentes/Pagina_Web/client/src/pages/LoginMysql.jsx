import React, { useState } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Personas from "../img/espe-personas.png";

const LoginMysql = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    // Validar que los campos no contengan caracteres especiales
    const regex = /^[a-zA-Z0-9]+$/;

    if (!regex.test(nombreUsuario) || !regex.test(contrasenia)) {
      alert("No se permiten caracteres especiales en el nombre de usuario o la contraseña.");
      return;
    }

    // Datos a enviar en la solicitud GET
    const data = {
      nombreus: nombreUsuario,
      contraseniaus: contrasenia,
    };

    axios
      .get("http://localhost:8800/api/loginmysql", { params: data })
      .then((response) => {
        // Si el inicio de sesión es exitoso, redirige al usuario a otra página
        if (response.data.message === "Ingreso correctamente") {
          // Aquí rediriges al componente que muestra los datos de personal
          localStorage.setItem("nombreUsuario", nombreUsuario);
          window.location.href = "http://localhost:3000/HomeC";
        }
      })
      .catch((error) => {
        setLoginError("Error al iniciar sesión. Por favor, inténtelo de nuevo.");
      });
  };

  return (
    <section className="login">
      <div className="container">
        <div className="row flex-grow-1">
          <div className="col-lg-7">
            <img src={LogoEspe} alt="" className="logo-login" />
            <img src={Personas} alt="" className="img-personas" />
          </div>
          <div className="col-lg-5">
            <div className="container">
              <form>
                <h2>Bienvenido</h2>

                <div className="inputbox">
                  <ion-icon name="lock-closed-outline"></ion-icon>
                  <input
                    type="text"
                    placeholder="Nombre de usuario"
                    value={nombreUsuario}
                    onChange={(e) => setNombreUsuario(e.target.value)}
                  />
                  <label htmlFor="">Usuario</label>
                </div>

                <div className="inputbox">
                  <input
                    type="password"
                    placeholder="Contraseña"
                    value={contrasenia}
                    onChange={(e) => setContrasenia(e.target.value)}
                  />
                  <label htmlFor="">Contraseña</label>
                </div>

                <button type="button" onClick={handleLogin}>Iniciar Sesión</button>

                {loginError && <p>{loginError}</p>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginMysql;
