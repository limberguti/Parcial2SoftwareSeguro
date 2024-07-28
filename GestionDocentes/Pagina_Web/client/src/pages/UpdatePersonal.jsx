import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import Actualizar from "../img/actualizar.png";
import Eliminar from "../img/eliminar.png";
import ModalA from "./ModalA";
import ModalE from "./ModalE";

const UpdatePersonal = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [per, setPer] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPer, setFilteredPer] = useState([]);
  const [iddocente, setIddocente] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [nombres, setNombres] = useState("");
  const [cedula, setCedula] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [genero, setGenero] = useState("");
  const [correop, setCorreop] = useState("");
  const [correoi, setCorreoi] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [provincia, setProvincia] = useState("");
  const [numero, setNumero] = useState("");
  const [campus, setCampus] = useState("");
  const [observacion, setObservacion] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Actualizar los estados según el campo de entrada

    if (name === "apellidos") {
      setApellidos(value);
    } else if (name === "cedula") {
      setCedula(value);
    } else if (name === "nombres") {
      setNombres(value);
    } else if (name === "cedula") {
      setCedula(value);
    } else if (name === "nacionalidad") {
      setNacionalidad(value);
    } else if (name === "genero") {
      setGenero(value);
    } else if (name === "correop") {
      setCorreop(value);
    } else if (name === "correoi") {
      setCorreoi(value);
    } else if (name === "ciudad") {
      setCiudad(value);
    } else if (name === "provincia") {
      setProvincia(value);
    } else if (name === "numero") {
      setNumero(value);
    } else if (name === "campus") {
      setCampus(value);
    } else if (name === "observacion") {
      setObservacion(value);
    }
  };
  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionPersonal";
  };
  const handleUpdatePersonal = () => {
    const updatedPersonalData = {};
    if (cedula !== "") updatedPersonalData.CEDULA = cedula;
    if (apellidos !== "") updatedPersonalData.APELLIDOS = apellidos;
    if (nombres !== "") updatedPersonalData.NOMBRES = nombres;
    if (nacionalidad !== "") updatedPersonalData.NACIONALIDAD = nacionalidad;
    if (genero !== "") updatedPersonalData.GENERO = genero;
    if (correop !== "") updatedPersonalData.CORREO_PERSONAL = correop;
    if (correoi !== "") updatedPersonalData.CORREO_INSTITUCIONAL = correoi;
    if (ciudad !== "") updatedPersonalData.CIUDAD = ciudad;
    if (provincia !== "") updatedPersonalData.PROVINCIA = provincia;
    if (numero !== "") updatedPersonalData.NROPERSONAL = numero;
    if (campus !== "") updatedPersonalData.CAMPUSSEDEPERSONAL = campus;
    if (observacion !== "")
      updatedPersonalData.OBSERVACIONESPERSONAL = observacion;

    // Verificar si hay campos modificados para evitar una actualización vacía
    if (Object.keys(updatedPersonalData).length === 0) {
      // No hay campos modificados, mostrar mensaje o hacer alguna acción adicional
      return;
    }
    axios
      .put(
        `http://localhost:8800/api/docente/${iddocente}`,
        updatedPersonalData
      )
      .then((response) => {
        console.log(response.data);
        // Actualizar los datos en el array per
        const updatedIndex = per.findIndex(
          (person) => person.IDDOCENTE === iddocente
        );
        if (updatedIndex !== -1) {
          per[updatedIndex] = { ...per[updatedIndex], ...updatedPersonalData };
          setPer([...per]); // Forzar la actualización del estado
        }
        // Mostrar el mensaje de éxito
        setShowSuccessMessage(true);
        // Limpiar los campos después de la actualización exitosa
        setCedula("");
        setApellidos("");
        setNombres("");
        setCedula("");
        setNacionalidad("");
        setGenero("");
        setCorreoi("");
        setCorreop("");
        setCiudad("");
        setCedula("");
        setProvincia("");
        setNumero("");
        setCampus("");
        setObservacion("");
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al actualizar personal:", error);
      });
  };

  useEffect(() => {
    const getPersonal = () => {
      fetch(`http://localhost:8800/api/docentesg`)
        .then((res) => res.json())
        .then((res) => {
          setPer(res);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    };
    getPersonal();
  }, []);

  const handleOpenModal = (iddocente) => {
    setIddocente(iddocente);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const handleOpenModal2 = (iddocente) => {
    setIddocente(iddocente);
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
        <h2>Actualizar Datos del Personal</h2>
        <button
          type="button"
          onClick={handleReturn}
          className="search__return2"
        >
          Regresar
        </button>
        <div>
          {per.length === 0 ? (
            <p>No se encontraron resultados.</p>
          ) : (
            <div className="table-responsive">
              <table className="content-table">
                <thead>
                  <tr>
                    <th>Acciones</th>
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
                    {/* Add more table headers based on your data */}
                  </tr>
                </thead>
                <tbody>
                  {per.map((person) => (
                    <tr key={person.IDDOCENTE}>
                      <td>
                        <td>
                          <img
                            src={Actualizar}
                            alt="Actualizar"
                            onClick={() => handleOpenModal(person.IDDOCENTE)}
                          />
                        </td>
                      </td>
                      <td>{person.IDDOCENTE}</td>
                      <td>{person.APELLIDOS}</td>
                      <td>{person.NOMBRES}</td>
                      <td>{person.CEDULA}</td>
                      <td>{person.NACIONALIDAD}</td>
                      <td>{person.GENERO}</td>
                      <td>{person.CORREO_PERSONAL}</td>
                      <td>{person.CORREO_INSTITUCIONAL}</td>
                      <td>{person.CIUDAD}</td>
                      <td>{person.PROVINCIA}</td>
                      <td>{person.NROPERSONAL}</td>
                      <td>{person.CAMPUSSEDEPERSONAL}</td>
                      <td>{person.OBSERVACIONESPERSONAL}</td>
                      {/* Add more table cells based on your data */}
                    </tr>
                  ))}
                </tbody>
              </table>
              {modalOpen && (
                <ModalA closeModal={handleCloseModal}>
                  <div className="row">
                    <h2>Actualizar Docente </h2>
                    <div className="col-lg-6">
                      <form className="form-inline">
                        <div className="form-group">
                          <label className="mr-2">Cedula:</label>
                          <input
                            type="text"
                            name="cedula"
                            className="form-control"
                            value={cedula}
                            onChange={handleInputChange}
                            maxLength="10"
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Apellidos:</label>
                          <input
                            type="text"
                            name="apellidos"
                            className="form-control"
                            value={apellidos}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Nombres:</label>
                          <input
                            type="text"
                            name="nombres"
                            className="form-control"
                            value={nombres}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Nacionalidad:</label>
                          <input
                            type="text"
                            name="nacionalidad"
                            className="form-control"
                            value={nacionalidad}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Género:</label>
                          <select
                            name="genero"
                            className="form-control"
                            value={genero}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="MASCULINO">MASCULINO</option>
                            <option value="FEMENINO">FEMENINO</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="mr-2">Correo Personal:</label>
                          <input
                            type="text"
                            name="correop"
                            className="form-control"
                            value={correop}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>
                    <div className="col-lg-6">
                      <form className="form-inline">
                        <div className="form-group">
                          <label className="mr-2">Correo Institucional:</label>
                          <input
                            type="text"
                            name="correoi"
                            className="form-control"
                            value={correoi}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Ciudad:</label>
                          <select
                            name="ciudad"
                            className="form-control"
                            value={ciudad}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="Quito">Quito</option>
                            <option value="Sangolquí">Sangolquí</option>
                            <option value="Ambato">Ambato</option>
                            <option value="Puyo">Puyo</option>
                            <option value="Latacunga">Latacunga</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="mr-2">Provincia:</label>
                          <select
                            name="provincia"
                            className="form-control"
                            value={provincia}
                            onChange={handleInputChange}
                          >
                            <option value="">Seleccione</option>
                            <option value="Pichincha">Pichincha</option>
                            <option value="Tungurahua">Tungurahua</option>
                            <option value="Pastaza">Pastaza</option>
                            <option value="Cotopaxi">Cotopaxi</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label className="mr-2">Número Personal:</label>
                          <input
                            type="text"
                            name="numero"
                            className="form-control"
                            value={numero}
                            onChange={handleInputChange}
                            pattern="[0-9]*"
                            maxLength="10"
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Campus:</label>
                          <input
                            type="text"
                            name="campus"
                            className="form-control"
                            value={campus}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label className="mr-2">Observaciones:</label>
                          <input
                            type="text"
                            name="observacion"
                            className="form-control"
                            value={observacion}
                            onChange={handleInputChange}
                          />
                        </div>
                      </form>
                    </div>

                    {showSuccessMessage && (
                      <div>Personal actualizado correctamente</div>
                    )}
                  </div>
                  <br></br>
                  <div className="d-flex w-100 justify-content-center">
                    <button
                      type="button"
                      onClick={handleUpdatePersonal}
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

export default UpdatePersonal;
