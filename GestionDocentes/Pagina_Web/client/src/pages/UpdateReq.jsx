import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Actualizar from "../img/actualizar.png";
import ModalA from "./ModalA";

const UpdateReq = () => {

  const [req, setReq] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [idrequerimiento, setIdrequerimiento] = useState("");
  const [sede, setSede] = useState("");
  const [departamento, setDepartamento] = useState("");
  const [denominacion, setDenominacion] = useState("");
  const [dedicacion, setDedicacion] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualizar los estados según el campo de entrada

    if (name === "sede") {
      setSede(value);
    } else if (name === "departamento") {
      setDepartamento(value);
    } else if (name === "denominacion") {
      setDenominacion(value);
    } else if (name === "dedicacion") {
      setDedicacion(value);
    }
  };
  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionReq";
  };
  const handleUpdateReq = () => {
    const updatedReqData = {};
    if (sede !== "") updatedReqData.SEDE = sede;
    if (departamento !== "") updatedReqData.DEPARTAMENTO = departamento;
    if (denominacion !== "") updatedReqData.DENOMINACION = denominacion;
    if (dedicacion !== "") updatedReqData.DEDICACION = dedicacion;

    // Verificar si hay campos modificados para evitar una actualización vacía
    if (Object.keys(updatedReqData).length === 0) {
      // No hay campos modificados, mostrar mensaje o hacer alguna acción adicional
      return;
    }
    axios
      .put(
        `http://localhost:8800/api/requerimiento/${idrequerimiento}`,
        updatedReqData
      )
      .then((response) => {
        console.log(response.data);
        // Actualizar los datos en el array req
        const updatedIndex = req.findIndex(
          (requerimiento) => requerimiento.IDREQUERIMIENTO === idrequerimiento
        );
        if (updatedIndex !== -1) {
          req[updatedIndex] = { ...req[updatedIndex], ...updatedReqData };
          setReq([...req]); // Forzar la actualización del estado
        }
        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);
        // Limpiar los campos después de la actualización exitosa
        setSede("");
        setDepartamento("");
        setDenominacion("");
        setDedicacion("");

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al actualizar requerimiento:", error);
      });
  };


  useEffect(() => {
    const getReq = () => {
      fetch(`http://localhost:8800/api/requerimientosg`)
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

  const handleOpenModal = (idrequerimiento) => {
    setIdrequerimiento(idrequerimiento);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal2 = (idrequerimiento) => {
    setIdrequerimiento(idrequerimiento);
    setModalOpen2(true);
  };

  const handleCloseModal2 = () => {
    setModalOpen2(false);
  };

  return (
    <section className="buscarp">
      <header className="d-flex justify-content-center">
        <img src={LogoEspe} alt="" />
      </header>
      <div className="contenido-buscar">
        <h2>Actualizar Datos del Requerimiento</h2>
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
                    <th>ID Requerimiento</th>
                    <th>ID Cargo</th>
                    <th>Sede</th>
                    <th>Departamento</th>
                    <th>Denominacion</th>
                    <th>Dedicacion</th>
                  </tr>
                </thead>
                <tbody>
                  {req.map((requerimiento) => (
                    <tr key={requerimiento.IDREQUERIMIENTO}>
                      <td>
                        <td>
                          <img
                            src={Actualizar}
                            alt="Actualizar"
                            onClick={() =>
                              handleOpenModal(requerimiento.IDREQUERIMIENTO)
                            }
                          />

                        </td>
                      </td>
                      <td>{requerimiento.IDREQUERIMIENTO}</td>
                      <td>{requerimiento.IDCARGO}</td>
                      <td>{requerimiento.SEDE}</td>
                      <td>{requerimiento.DEPARTAMENTO}</td>
                      <td>{requerimiento.DENOMINACION}</td>
                      <td>{requerimiento.DEDICACION}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {modalOpen && (
                <ModalA closeModal={handleCloseModal}>
                  <div className="row">
                    <h2>Actualizar Requerimiento </h2>
                    <div className="col-lg-12">
                      <form className="form-inline">
                        <div className="form-group">
                          <label className="mr-2">Sede:</label>
                          <select
                            name="sede"
                            className="form-control"
                            value={sede}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="Matriz">MATRIZ</option>
                            <option value="Unidad Académica Especial">
                              UNIDAD ACADEMICA ESPECIAL
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Departamento:</label>
                          <select
                            name="departamento"
                            className="form-control"
                            value={departamento}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="IDIOMAS">IDIOMAS</option>
                            <option value="IWIAS">IWIAS</option>
                            <option value="ESFORSE">ESFORSE</option>
                            <option value="DEPARTAMENTO DE CIENCIAS DE LA ENERGIA Y MECA">
                              DEPARTAMENTO DE CIENCIAS DE LA ENERGIA Y MECA
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS EXACTAS">
                              DEPARTAMENTO DE CIENCIAS EXACTAS
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS MÉDICAS">
                              DEPARTAMENTO DE CIENCIAS MÉDICAS
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS ECONOMICAS, ADMINIST">
                              DEPARTAMENTO DE CIENCIAS ECONOMICAS, ADMINIST
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS HUMANAS Y SOCIALES">
                              DEPARTAMENTO DE CIENCIAS HUMANAS Y SOCIALES
                            </option>
                            <option value="DEPARTAMENTO DE SEGURIDAD Y DEFENSA">
                              DEPARTAMENTO DE SEGURIDAD Y DEFENSA
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS DE LA VIDA Y AGRICUL">
                              DEPARTAMENTO DE CIENCIAS DE LA VIDA Y AGRICUL
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS DE LA COMPUTACION">
                              DEPARTAMENTO DE CIENCIAS DE LA COMPUTACION
                            </option>
                            <option value="UNIDAD ACADÉMICA ESPECIAL -ETFA">
                              UNIDAD ACADÉMICA ESPECIAL -ETFA
                            </option>
                            <option value="DEPARTAMENTO DE CIENCIAS DE LA TIERRA Y LA CO">
                              DEPARTAMENTO DE CIENCIAS DE LA TIERRA Y LA CO
                            </option>
                            <option value="CENTRO DE NANO CIENCIA Y NANO TECNOLOGÍA">
                              CENTRO DE NANO CIENCIA Y NANO TECNOLOGÍA
                            </option>
                            <option value="DEPARTAMENTO DE ELECTRICA, ELECTRONICA Y TELE">
                              DEPARTAMENTO DE ELECTRICA, ELECTRONICA Y TELE
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Denominacion:</label>
                          <select
                            name="denominacion"
                            className="form-control"
                            value={denominacion}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="PROFESOR NO TITULAR OCASIONAL">
                              PROFESOR NO TITULAR OCASIONAL
                            </option>
                            <option value="PERSONAL DE APOYO ACADÉMICO TÉCNICO DOCENTE A">
                              PERSONAL DE APOYO ACADÉMICO TÉCNICO DOCENTE A
                            </option>
                            <option value="PERSONAL DE APOYO ACADÉMICO TÉCNICO DE LABORA">
                              PERSONAL DE APOYO ACADÉMICO TÉCNICO DE LABORA
                            </option>
                            <option value="PROFESOR NO TITULAR OCASIONAL DE FORMACIÓN TÉ">
                              PROFESOR NO TITULAR OCASIONAL DE FORMACIÓN TÉCNICO
                            </option>
                            <option value="PERSONAL DE APOYO ACADÉMICO TÉCNICO DE INVEST">
                              PERSONAL DE APOYO ACADÉMICO TÉCNICO DE
                              INVESTIGACION
                            </option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Dedicacion:</label>
                          <select
                            name="dedicacion"
                            className="form-control"
                            value={dedicacion}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="TIEMPO COMPLETO">
                              TIEMPO COMPLETO
                            </option>
                            <option value="TIEMPO PARCIAL">
                              TIEMPO PARCIAL
                            </option>
                            <option value="MEDIO TIEMPO">MEDIO TIEMPO</option>
                          </select>
                        </div>
                      </form>
                    </div>

                    {showSuccessMessage && (
                      <div>Requerimiento actualizado correctamente</div>
                    )}
                  </div>
                  <br></br>
                  <div className="d-flex w-100 justify-content-center">
                    <button
                      type="button"
                      onClick={handleUpdateReq}
                      className="w-25 btn btn-success btn-sm"
                      style={{ border: "5px solid green" }}
                    >
                      Actualizar
                    </button>
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

export default UpdateReq;
