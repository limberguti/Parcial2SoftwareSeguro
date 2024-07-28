import React, { useState, useEffect } from "react";
import LogoEspe from "../img/logoespe.png";
import axios from "axios";

const SearchReq = () => {
  //Api creada
  const [per, setReq] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredReq, setFilteredReq] = useState([]);

  useEffect(() => {
    const getReq = () => {
      fetch(`http://localhost:8800/api`)
        .then((res) => res.json())
        .then((res) => {
          setReq(res);
        });
    };
    getReq();
  }, []);

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionReq";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredReq([]);
      return;
    }

    const delayTimer = setTimeout(() => {
      axios
        .get(`http://localhost:8800/api/requerimiento/?search=${searchQuery}`)
        .then((response) => {
          setFilteredReq(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFilteredReq([]);
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
        <h2>Buscar Requerimiento </h2>
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
        {filteredReq.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <div className="table-responsive">
            <table className="content-table">
              <thead>
                <tr>
                  <th>ID Requerimiento</th>
                  <th>ID Cargo</th>
                  <th>Sede </th>
                  <th>Nombre del Departamento</th>
                  <th>Denominacion</th>
                  <th>Dedicacion</th>
                </tr>
              </thead>
              <tbody>
                {filteredReq.map((req) => (
                  <tr key={req.IDREQUERIMIENTO}>
                    <td>{req.IDREQUERIMIENTO}</td>
                    <td>{req.IDCARGO}</td>
                    <td>{req.SEDE}</td>
                    <td>{req.DEPARTAMENTO}</td>
                    <td>{req.DENOMINACION}</td>
                    <td>{req.DEDICACION}</td>
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
export default SearchReq;
