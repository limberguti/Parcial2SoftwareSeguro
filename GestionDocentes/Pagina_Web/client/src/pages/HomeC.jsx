import React from "react";
import { useNavigate } from "react-router";
import profesor from "../img/profesor.png";
import depa from "../img/depa.png";
import contrato from "../img/contrato.png";
import LogoEspe from "../img/logoespe.png";
import cargo from "../img/cargo.png";
import tiempo from "../img/tiempo.png";
import { Link } from "react-router-dom";


const HomeC = () => {
  

  
  const nombreUsuario = localStorage.getItem("nombreUsuario");
  //const { logOut, user } = useAuth();
  const navigate = useNavigate();
  
  const handleLogoutmysql = () => {
    // Eliminar el nombre de usuario de LocalStorage al cerrar sesión
    localStorage.removeItem("nombreUsuario");
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/LoginMysql";
  };



  return (
    <section className="home">
      <header className="d-flex justify-content-center">
        <img src={LogoEspe} alt="" />
      </header>
      <h2>Bienvenido {nombreUsuario}</h2>
      <label><strong> GESTION DE CONTRATOS</strong> </label>
      <div className="container">
        <div className="row custom-row">
          <div className="col-lg-2">
            <img src={profesor} alt="" className="imagen" />
            <Link to="/GestionPersonal" className="enlace"> <h1> Docente</h1> </Link>
          </div>
          <div className="col-lg-2">
            <img src={depa} alt="" className="imagen" />
            <Link to="/GestionReq" className="enlace"> <h1>Requerimiento</h1> </Link>
          </div>
          <div className="col-lg-2">
            <img src={contrato} alt="" className="imagen" />
            <Link to="/GestionContratos" className="enlace"> <h1>Contratos</h1> </Link>
          </div>
          <div className="col-lg-2">
            <img src={tiempo} alt="" className="imagen" />
            <Link to="/GestionTiempo" className="enlace"> <h1>Tiempos</h1> </Link>
          </div>
          <div className="col-lg-2">
            <img src={cargo} alt="" className="imagen" />
            <Link to="/GestionCargo" className="enlace"> <h1>Cargos</h1> </Link>
          </div>
          
        </div>
        <button onClick={handleLogoutmysql}>Cerrar Sesión</button>
      </div>
      <footer className="footer fixed-bottom">
        <span className="text-left"> Universidad de las Fuerzas Armadas ESPE <br></br> Todos los derechos reservados 2023</span>
      </footer>
    </section>
  );
};

export default HomeC;
