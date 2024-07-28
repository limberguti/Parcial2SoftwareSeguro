import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Actualizar from "../img/actualizar.png";
import ModalA from "./ModalA";

const UpdateCargo = () => {
  const [req, setReq] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [idcargo, setIdCargo] = useState("");
  const [tipoPersonal, setTipoPersonal] = useState("");
  const [categoria, setCategoria] = useState("");
  const [nivel, setNivel] = useState("");
  const [grado, setGrado] = useState("");
  const [remuneracion, setRemuneracion] = useState("");


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "tipoPersonal") {
      setTipoPersonal(value);
    } else if (name === "categoria") {
      setCategoria(value);
    } else if (name === "nivel") {
      setNivel(value);
    } else if (name === "grado") {
      setGrado(value);
    } else if (name === "remuneracion") {
      setRemuneracion(value);
    } else if (name === "idcargo") {
      setIdCargo(value);
    }
  };
  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionCargo";
  };

  const handleUpdateReq = () => {
    const updatedData = {};
    if (tipoPersonal !== "") updatedData.TIPOPERSONAL = tipoPersonal;
    if (categoria !== "") updatedData.CATEGORIA = categoria;
    if (nivel !== "") updatedData.NIVEL = nivel;
    if (grado !== "") updatedData.GRADO = grado;
    if (remuneracion !== "") updatedData.REMUNERACION = remuneracion;
    // Verificar si hay campos modificados para evitar una actualización vacía
    if (Object.keys(updatedData).length === 0) {
      // No hay campos modificados, mostrar mensaje o hacer alguna acción adicional
      return;
    }

    axios
      .put(`http://localhost:8800/api/cargo/${idcargo}`, updatedData)
      .then((response) => {
        console.log(response.data);
        const updatedIndex = req.findIndex(
          (cargo) => cargo.IDCARGO === idcargo
        );
        if (updatedIndex !== -1) {
          req[updatedIndex] = { ...req[updatedIndex], ...updatedData };
          setReq([...req]); // Forzar la actualización del estado
        }

        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);
        // Limpiar los campos después de la actualización exitosa
        setTipoPersonal("");
        setCategoria("");
        setNivel("");
        setRemuneracion("");
        setGrado("");
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al actualizar tiempo:", error);
      });
  };


  useEffect(() => {
    const getReq = () => {
      fetch(`http://localhost:8800/api/cargog`)
        .then((res) => res.json())
        .then((res) => {
          setReq(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getReq();
  }, []);

  const handleOpenModal = (idcargo) => {
    setIdCargo(idcargo);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="buscarp">
      <header className="d-flex justify-content-center">
        <img src={LogoEspe} alt="" />
      </header>
      <div className="contenido-buscar">
        <h2>Actualizar Datos del Cargo</h2>
        <button
          type="button"
          onClick={handleReturn}
          className="search__return2"
        >
          Regresar
        </button>
        <div>
          {req.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>ID Cargo</th>
                    <th>ID Tiempo</th>
                    <th>Tipo Personal</th>
                    <th>Categoria</th>
                    <th>Nivel</th>
                    <th>Grado</th>
                    <th>Remuneracion</th>
                  </tr>
                </thead>
                <tbody>
                  {req.map((cargo) => (
                    <tr key={cargo.IDCARGO}>
                      <td>
                        <td>
                          <img
                            src={Actualizar}
                            alt="Actualizar"
                            onClick={() =>
                              handleOpenModal(cargo.IDCARGO)
                            }
                          />

                        </td>
                      </td>
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
              {modalOpen && (
                <ModalA closeModal={handleCloseModal}>
                  <div className="row">
                    <h2>Actualizar Cargo </h2>
                    <div className="row justify-content-center align-items-center">

                      <div className="col-md-6">

                        <div className="form-group">
                          <label className="mr-2">Tipo de Personal:</label>
                          <select
                            name="tipoPersonal"
                            value={tipoPersonal}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Seleccione</option>
                            <option value="PERSONAL DE APOYO ACADEMICO">PERSONAL DE APOYO ACADEMICO</option>
                            <option value="PERSONAL ACADEMICO DE GRADO">PERSONAL ACADEMICO DE GRADO</option>
                            <option value="PERSONAL ACADEMICO DE FORMACION TECNICA Y TECNOLOG">PERSONAL ACADEMICO DE FORMACION TECNICA Y TECNOLOGICA</option>

                          </select>

                        </div>
                        <div className="form-group">
                          <label className="mr-2">Categoria:</label>
                          <select
                            name="categoria"
                            value={categoria}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Seleccione</option>
                            <option value="PRINCIPAL">PRINCIPAL</option>
                            <option value="AGREGADO">AGREGADO</option>
                            <option value="AUXILIAR">AUXILIAR</option>
                            <option value="OCASIONAL">OCASIONAL</option>
                            <option value="PERSONAL DE APOYO">PERSONAL DE APOYO</option>

                          </select>

                        </div>

                        <div className="form-group">
                          <label className="mr-2">Nivel:</label>
                          <select
                            name="nivel"
                            value={nivel}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Seleccione</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>

                          </select>

                        </div>

                        <div className="form-group">
                          <label className="mr-2">Grado:</label>
                          <select
                            name="grado"
                            value={grado}
                            onChange={handleInputChange}
                            className="form-control"
                          >
                            <option value="">Seleccione</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>


                          </select>

                        </div>

                        <div className="form-group">
                          <label className="mr-2">Remuneracion:</label>
                          <input
                            type="text"
                            name="remuneracion"
                            value={remuneracion}
                            onChange={handleInputChange}
                            className="form-control"
                          />
                        </div>
                        <div className="d-flex justify-content-center mt-3">
                          <div className="d-inline-flex">

                            <button
                              type="button"
                              onClick={handleUpdateReq}
                              className="btn btn-success"
                            >
                              Actualizar
                            </button>
                          </div>
                        </div>
                        {showSuccessMessage && (
                          <div>Cargo actualizado correctamente</div>
                        )}
                      </div>
                    </div>
                  </div>
                </ModalA>
              )}
            </div>
          )}
        </div>
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

export default UpdateCargo;
