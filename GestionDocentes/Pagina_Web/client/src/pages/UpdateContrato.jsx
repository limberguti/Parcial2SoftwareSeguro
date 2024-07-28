import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Actualizar from "../img/actualizar.png";
import ModalA from "./ModalA";

const UpdateContrato = () => {
  const [contr, setContr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idcontrato, setIdcontrato] = useState("");
  const [fechainicio, setFechainicio] = useState("");
  const [fechafin, setFechafin] = useState("");
  const [fuente, setFuente] = useState("");
  const [fecha, setFecha] = useState("");
  const [certificacion_presupuestaria, setCertificacion_presupuestaria] =
    useState("");
  const [idmemo, setIdmemo] = useState("");
  const [analistadelproceso, setAnalistadelproceso] = useState("");
  const [archivomemo, setArchivomemo] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualizar los estados según el campo de entrada

    if (name === "fechainicio") {
      setFechainicio(value);
    } else if (name === "fechafin") {
      setFechafin(value);
    } else if (name === "fuente") {
      setFuente(value);
    } else if (name === "fecha") {
      setFecha(value);
    } else if (name === "certificacion_presupuestaria") {
      setCertificacion_presupuestaria(value);
    } else if (name === "idmemo") {
      setIdmemo(value);
    } else if (name === "analistadelproceso") {
      setAnalistadelproceso(value);
    } else if (name === "archivomemo") {
      setArchivomemo(value);
    }
  };
  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionContratos";
  };
  const handleUpdateContrato = () => {
    const updatedContractData = {};
    if (fechainicio !== "") updatedContractData.FECHAINICIO = fechainicio;
    if (fechafin !== "") updatedContractData.FECHAFIN = fechafin;
    if (fuente !== "") updatedContractData.FUENTE = fuente;
    if (fecha !== "") updatedContractData.FECHA = fecha;
    if (certificacion_presupuestaria !== "")
      updatedContractData.CERTIFICACION_PRESUPUESTARIA =
        certificacion_presupuestaria;
    if (idmemo !== "") updatedContractData.IDMEMO = idmemo;
    if (analistadelproceso !== "")
      updatedContractData.ANALISTADELPROCESO = analistadelproceso;
    if (archivomemo !== "") updatedContractData.ARCHIVOMEMO = archivomemo;

    // Verificar si hay campos modificados para evitar una actualización vacía
    if (Object.keys(updatedContractData).length === 0) {
      // No hay campos modificados, mostrar mensaje o hacer alguna acción adicional
      return;
    }
    axios
      .put(
        `http://localhost:8800/api/tiempo/${idcontrato}`,
        updatedContractData
      )
      .then((response) => {
        console.log(response.data);
        // Actualizar los datos en el array req
        const updatedIndex = contr.findIndex(
          (contrato) => contrato.IDCONTRATO === idcontrato
        );
        if (updatedIndex !== -1) {
          contr[updatedIndex] = {
            ...contr[updatedIndex],
            ...updatedContractData,
          };
          setContr([...contr]); // Forzar la actualización del estado
        }
        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);
        // Limpiar los campos después de la actualización exitosa
        setFechainicio("");
        setFechafin("");
        setFuente("");
        setFecha("");
        setCertificacion_presupuestaria("");
        setIdmemo("");
        setAnalistadelproceso("");
        setArchivomemo("");

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al actualizar contrato:", error);
      });
  };

  useEffect(() => {
    const getContract = () => {
      fetch(`http://localhost:8800/api/contratosg`)
        .then((res) => res.json())
        .then((res) => {
          setContr(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getContract();
  }, []);

  const handleOpenModal = (idcontrato) => {
    setIdcontrato(idcontrato);
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
        <h2>Actualizar Datos del Contrato</h2>
        <button
          type="button"
          onClick={handleReturn}
          className="search__return2"
        >
          Regresar
        </button>
        <div>
          {contr.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>ID Contrato</th>
                    <th>ID Docente</th>
                    <th>ID Requerimiento</th>
                    <th>Fecha Inicio</th>
                    <th>Fecha Fin</th>
                    <th>Fuente</th>
                    <th>Fecha</th>
                    <th>Certificacion Presupuestaria</th>
                    <th>ID Memo</th>
                    <th>Analista del Proceso</th>
                    <th>Archivo Memo</th>
                  </tr>
                </thead>
                <tbody>
                  {contr.map((contrato) => (
                    <tr key={contrato.IDCONTRATO}>
                      <td>
                        <td>
                          <img
                            src={Actualizar}
                            alt="Actualizar"
                            onClick={() => handleOpenModal(contrato.IDCONTRATO)}
                          />
                        </td>
                      </td>
                      <td>{contrato.IDCONTRATO}</td>
                      <td>{contrato.IDDOCENTE}</td>
                      <td>{contrato.IDREQUERIMIENTO}</td>
                      <td style={{ width: "106px" }}>{contrato.FECHAINICIO.substring(0, 10)}</td>
                      <td style={{ width: "106px" }}>{contrato.FECHAFIN.substring(0, 10)}</td>
                      <td>{contrato.FUENTE}</td>
                      <td style={{ width: "106px" }}>{contrato.FECHA.substring(0, 10)}</td>
                      <td>{contrato.CERTIFICACION_PRESUPUESTARIA}</td>
                      <td>{contrato.IDMEMO}</td>
                      <td>{contrato.ANALISTADELPROCESO}</td>
                      <td>{contrato.ARCHIVOMEMO}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {modalOpen && (
                <ModalA closeModal={handleCloseModal}>
                  <div className="row">
                    <h2>Actualizar Contrato </h2>
                    <div className="col-lg-6">
                      <form className="form-inline">
                        <div className="form-group">
                          <label className="mr-2">Fecha inicio:</label>
                          <input
                            type="date"
                            name="fechainicio"
                            className="form-control"
                            value={fechainicio}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Fecha fin:</label>
                          <input
                            type="date"
                            name="fechaFin"
                            className="form-control"
                            value={fechafin}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Fuente:</label>
                          <input
                            type="text"
                            name="fuente"
                            className="form-control"
                            value={fuente}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Fecha contrato:</label>
                          <input
                            type="date"
                            name="fecha"
                            className="form-control"
                            value={fecha}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6">
                      <form className="form-inline">
                        <div className="form-group">
                          <label className="mr-2">
                            Certificacion presupuestaria:
                          </label>
                          <input
                            type="text"
                            name="certificacion_presupuestaria"
                            className="form-control"
                            value={certificacion_presupuestaria}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Id memo:</label>
                          <input
                            type="number"
                            name="idmemo"
                            className="form-control"
                            value={idmemo}
                            onChange={handleInputChange}
                            maxLength="5"
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Analista del proceso:</label>
                          <input
                            type="text"
                            name="analistadelproceso"
                            className="form-control"
                            value={analistadelproceso}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Archivo memo:</label>
                          <input
                            type="text"
                            name="archivomemo"
                            className="form-control"
                            value={archivomemo}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>

                    {showSuccessMessage && (
                      <div>Contrato actualizado correctamente</div>
                    )}
                  </div>
                  <br></br>
                  <div className="d-flex w-100 justify-content-center">
                    <button
                      type="button"
                      onClick={handleUpdateContrato}
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

export default UpdateContrato;
