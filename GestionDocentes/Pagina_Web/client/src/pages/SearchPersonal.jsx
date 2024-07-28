import React, { useState, useEffect } from "react";
import LogoEspe from "../img/logoespe.png";
import axios from "axios";

const SearchPersonal = () => {
  //Api creada
  const [per, setPer] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPer, setFilteredPer] = useState([]);

  useEffect(() => {
    const getPersonal = () => {
      fetch(`http://localhost:8800/api`)
        .then((res) => res.json())
        .then((res) => {
          setPer(res);
        });
    };
    getPersonal();
  }, []);

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionPersonal";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPer([]);
      return;
    }

    const delayTimer = setTimeout(() => {
      axios
        .get(`http://localhost:8800/api/docente/?search=${searchQuery}`)
        .then((response) => {
          setFilteredPer(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFilteredPer([]);
        });
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  return (
    <section className="buscarp">
      <header className="d-flex justify-content-center">
        <img src={LogoEspe} alt="" className="logo-espe" />
      </header>
      <div className="contenido-buscar">
        <h2>Buscar Datos de Personal</h2>
        <div className="search__container">
          <input
            type="text"
            placeholder="BUSCAR...."
            className="search__input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button type="button" onClick={handleReturn} className="search__return">
            Regresar
          </button>
        </div>
        {filteredPer.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <div className="table-responsive">
            <table className="content-table">
              <thead>
                <tr>
                  <th>ID Personal</th>
                  <th>Apellidos</th>
                  <th>Nombres</th>
                  <th>Cédula</th>
                  <th>Nacionalidad</th>
                  <th>Género</th>
                  <th>Correo Personal</th>
                  <th>Correo Institucional</th>
                  <th>Ciudad</th>
                  <th>Provincia</th>
                  <th>Número Personal</th>
                  <th>Campus</th>
                  <th>Observaciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredPer.map((per) => (
                  <tr key={per.IDDOCENTE}>
                    <td>{per.IDDOCENTE}</td>
                    <td>{per.APELLIDOS}</td>
                    <td>{per.NOMBRES}</td>
                    <td>{per.CEDULA}</td>
                    <td>{per.NACIONALIDAD}</td>
                    <td>{per.GENERO}</td>
                    <td>{per.CORREO_PERSONAL}</td>
                    <td>{per.CORREO_INSTITUCIONAL}</td>
                    <td>{per.CIUDAD}</td>
                    <td>{per.PROVINCIA}</td>
                    <td>{per.NROPERSONAL}</td>
                    <td>{per.CAMPUSSEDEPERSONAL}</td>
                    <td>{per.OBSERVACIONESPERSONAL}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <footer className="footer mt-auto">
        <span className="text-left">
          {" "}
          Universidad de las Fuerzas Armadas ESPE <br></br> Todos los derechos
          reservados 2023
        </span>
      </footer>
    </section>
  );
};
export default SearchPersonal;
