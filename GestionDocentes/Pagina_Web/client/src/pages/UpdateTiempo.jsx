import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Actualizar from "../img/actualizar.png";
import ModalA from "./ModalA";

const UpdateTiempo = () => {
  const [time, setTime] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [idtiempo, setIdTiempo] = useState("");
  const [horas, setHoras] = useState("");
  const [codigo, setCodigo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualizar los estados según el campo de entrada

    if (name === "horas") {
      setHoras(value);
    } else if (name === "codigo") {
      setCodigo(value);
    } else if (name === "descripcion") {
      setDescripcion(value);
    }
  };
  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionTiempo";
  };
  const handleUpdateTiempo = () => {
    const updatedTimeData = {};
    if (horas !== "") updatedTimeData.HORAS = horas;
    if (codigo !== "") updatedTimeData.CODIGO = codigo;
    if (descripcion !== "") updatedTimeData.DESCRIPCION = descripcion;

    // Verificar si hay campos modificados para evitar una actualización vacía
    if (Object.keys(updatedTimeData).length === 0) {
      // No hay campos modificados, mostrar mensaje o hacer alguna acción adicional
      return;
    }
    axios
      .put(`http://localhost:8800/api/tiempo/${idtiempo}`, updatedTimeData)
      .then((response) => {
        console.log(response.data);
        // Actualizar los datos en el array req
        const updatedIndex = time.findIndex(
          (tiempo) => tiempo.IDTIEMPO === idtiempo
        );
        if (updatedIndex !== -1) {
          time[updatedIndex] = { ...time[updatedIndex], ...updatedTimeData };
          setTime([...time]); // Forzar la actualización del estado
        }
        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);
        // Limpiar los campos después de la actualización exitosa
        setDescripcion("");
        setCodigo("");
        setHoras("");

        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al actualizar tiempo:", error);
      });
  };

  useEffect(() => {
    const getTime = () => {
      fetch(`http://localhost:8800/api/tiemposg`)
        .then((res) => res.json())
        .then((res) => {
          setTime(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getTime();
  }, []);

  const handleOpenModal = (idtiempo) => {
    setIdTiempo(idtiempo);
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
        <h2>Actualizar Datos del Tiempo</h2>
        <button
          type="button"
          onClick={handleReturn}
          className="search__return2"
        >
          Regresar
        </button>
        <div>
          {time.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Acciones</th>
                    <th>ID Tiempo</th>
                    <th>Descripcion</th>
                    <th>Codigo</th>
                    <th>Horas</th>
                  </tr>
                </thead>
                <tbody>
                  {time.map((tiempo) => (
                    <tr key={tiempo.IDTIEMPO}>
                      <td>
                        <td>
                          <img
                            src={Actualizar}
                            alt="Actualizar"
                            onClick={() => handleOpenModal(tiempo.IDTIEMPO)}
                          />
                        </td>
                      </td>
                      <td>{tiempo.IDTIEMPO}</td>
                      <td>{tiempo.DESCRIPCION}</td>
                      <td>{tiempo.CODIGO}</td>
                      <td>{tiempo.HORAS}</td>
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
                          <label className="mr-2">Codigo:</label>
                          <input
                            type="text"
                            name="codigo"
                            className="form-control"
                            value={codigo}
                            onChange={handleInputChange}
                         />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Horas:</label>
                          <input
                            type="text"
                            name="horas"
                            className="form-control"
                            value={horas}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            maxLength="5"
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Descripcion:</label>
                          <input
                            type="text"
                            name="descripcion"
                            className="form-control"
                            value={descripcion}
                            onChange={handleInputChange}
                          />
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
                      onClick={handleUpdateTiempo}
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

export default UpdateTiempo;
