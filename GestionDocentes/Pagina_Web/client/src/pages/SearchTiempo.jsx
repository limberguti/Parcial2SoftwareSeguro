import React, { useState, useEffect } from "react";
import LogoEspe from "../img/logoespe.png";
import axios from "axios";

const SearchTiempo = () => {
  //Api creada
  const [per, setTime] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTime, setFilteredTime] = useState([]);

  useEffect(() => {
    const getTiempo = () => {
      fetch(`http://localhost:8800/api`)
        .then((res) => res.json())
        .then((res) => {
          setTime(res);
        });
    };
    getTiempo();
  }, []);

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionTiempo";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredTime([]);
      return;
    }

    const delayTimer = setTimeout(() => {
      axios
        .get(`http://localhost:8800/api/tiempo/?search=${searchQuery}`)
        .then((response) => {
          setFilteredTime(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFilteredTime([]);
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
        <h2>Buscar Tiempo</h2>
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
          <button
            type="button"
            onClick={handleReturn}
            className="search__return"
          >
            Regresar
          </button>
        </div>
        {filteredTime.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <div className="table-responsive">
            <table className="content-table">
              <thead>
                <tr>
                  <th>ID Tiempo</th>
                  <th>Codigo</th>
                  <th>Horas</th>
                  <th>Descripcion</th>
                </tr>
              </thead>
              <tbody>
                {filteredTime.map((time) => (
                  <tr key={time.IDTIEMPO}>
                    <td>{time.IDTIEMPO}</td>
                    <td>{time.CODIGO}</td>
                    <td>{time.HORAS}</td>
                    <td>{time.DESCRIPCION}</td>
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
export default SearchTiempo;
