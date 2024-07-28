import React, { useState, useEffect } from "react";
import LogoEspe from "../img/logoespe.png";
import axios from "axios";

const SearchCargo = () => {
  //Api creada
  const [setCargo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCargo, setFilteredCargo] = useState([]);

  useEffect(() => {
    const getCargo = () => {
      fetch(`http://localhost:8800/api`)
        .then((res) => res.json())
        .then((res) => {
          setCargo(res);
        });
    };
    getCargo();
  }, []);

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionCargo";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCargo([]);
      return;
    }

    const delayTimer = setTimeout(() => {
      axios
        .get(`http://localhost:8800/api/cargo/?search=${searchQuery}`)
        .then((response) => {
          setFilteredCargo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFilteredCargo([]);
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
        <h2>Buscar Cargo</h2>
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
        {filteredCargo.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <div className="table-responsive">
            <table className="content-table">
              <thead>
                <tr>
                  <th>ID Cargo</th>
                  <th>ID Tiempo</th>
                  <th>Tipo de Personal</th>
                  <th>Categoria</th>
                  <th>Nivel</th>
                  <th>Grado</th>
                  <th>Remuneracion</th>
                </tr>
              </thead>
              <tbody>
                {filteredCargo.map((cargo) => (
                  <tr key={cargo.IDCARGO}>
                    <td>{cargo.IDCARGO}</td>
                    <td>{cargo.IDTIEMPO}</td>
                    <td>{cargo.TIPOPERSONAL}</td>
                    <td>{cargo.CATEGORIA}</td>
                    <td>{cargo.NIVEL}</td>
                    <td>{cargo.GRADO}</td>
                    <td>{cargo.REMUNERACION}</td>
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
export default SearchCargo;
