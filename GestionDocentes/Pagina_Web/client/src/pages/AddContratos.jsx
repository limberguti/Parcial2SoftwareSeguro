import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import hexagono from "../img/hexagono.png";

const AddCargo = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [docentes, setDocente] = useState([]); // Estado para almacenar los tiempos
  const [selectedDocente, setSelectedDocente] = useState(""); // Estado para almacenar el docente seleccionado
  const [reqs, setReqs] = useState([]); // Estado para almacenar los tiempos
  const [selectedReq, setSelectedReq] = useState(""); // Estado para almacenar el tiempo seleccionado

  useEffect(() => {
    // Cargar la lista de tiempos desde la base de datos al montar el componente
    axios.get("http://localhost:8800/api/docentes").then((response) => {
      setDocente(response.data);
    });
    axios.get("http://localhost:8800/api/requerimientos").then((response) => {
      setReqs(response.data);
    });
  }, []);

  const fechaValida = () => {
    const fechaInicio = new Date(newContrato.FECHAINICIO);
    const fechaFin = new Date(newContrato.FECHAFIN);
    return fechaFin >= fechaInicio;
  };

  const [newContrato, setNewContrato] = useState({
    IDDOCENTE: selectedDocente,
    IDREQUERIMIENTO: selectedReq,
    FECHAINICIO: "",
    FECHAFIN: "",
    FUENTE: "",
    FECHA: "",
    CERTIFICACION_PRESUPUESTARIA: "",
    IDMEMO: "",
    ANALISTADELPROCESO: "",
    ARCHIVOMEMO: "",
  });

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionContratos";
  };

  const handleClean = () => {
    // Limpiar el formulario después de agregar el personal
    setSelectedDocente("");
    setSelectedReq("");
    setNewContrato({
      FECHAINICIO: "",
      FECHAFIN: "",
      FUENTE: "",
      FECHA: "",
      CERTIFICACION_PRESUPUESTARIA: "",
      IDMEMO: "",
      ANALISTADELPROCESO: "",
      ARCHIVOMEMO: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewContrato({
      ...newContrato,
      [name]: value,
    });
  };

  const cargoData = {
    IDDOCENTE: selectedDocente,
    IDREQUERIMIENTO: selectedReq,
    FECHAINICIO: newContrato.FECHAINICIO,
    FECHAFIN: newContrato.FECHAFIN,
    FUENTE: newContrato.FUENTE,
    FECHA: newContrato.FECHA,
    CERTIFICACION_PRESUPUESTARIA: newContrato.CERTIFICACION_PRESUPUESTARIA,
    IDMEMO: newContrato.IDMEMO,
    ANALISTADELPROCESO: newContrato.ANALISTADELPROCESO,
    ARCHIVOMEMO: newContrato.ARCHIVOMEMO
  };

  const handleAddContrato = () => {
    // Verificar si alguno de los campos obligatorios está vacío
    if (
      selectedDocente === null ||
      selectedReq === null ||
      newContrato.FECHAINICIO.trim() === "" ||
      newContrato.FECHAFIN.trim() === "" ||
      newContrato.FECHA.trim() === "" ||
      newContrato.CERTIFICACION_PRESUPUESTARIA.trim() === "" ||
      newContrato.ANALISTADELPROCESO.trim() === "" ||
      !fechaValida()
    ) {
      // Mostrar una advertencia o mensaje al usuario
      alert("Por favor, llene todos los campos obligatorios y la fecha de fin debe ser posterior a la fecha de inicio.");
      return;
    }

    axios
      .post("http://localhost:8800/api/contrato", cargoData)
      .then((response) => {
        console.log(response.data); // Puedes mostrar un mensaje de éxito o redirigir a otra página
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Limpiar el formulario después de agregar el tiempo
        setSelectedDocente("");
        setSelectedReq("");
        setNewContrato({
          FECHAINICIO: "",
          FECHAFIN: "",
          FUENTE: "",
          FECHA: "",
          CERTIFICACION_PRESUPUESTARIA: "",
          IDMEMO: "",
          ANALISTADELPROCESO: "",
          ARCHIVOMEMO: "",
        });
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al agregar personal:", error);
      });
  };

  return (
    <section className="add-req">
      <div className="container">
        <header className="d-flex justify-content-center">
          <img src={LogoEspe} alt="" />
        </header>
        <div className="d-flex pt-2 pb-0 justify-content-center">
          <img src={hexagono} alt="" className="hexagono" />
          <h1>Agregar Nuevo Contrato</h1>
        </div>
        <div className="row flex-grow-1">
          <form className="d-flex">
            <div className="col-lg-12">
              <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="sede" className="col-form-label">Docente*:</label>
                </div>
                <div className="col-auto">
                  <select
                    name="IDDOCENTE"
                    id="sede"
                    className="form-control"
                    value={selectedDocente}
                    onChange={(e) => setSelectedDocente(parseInt(e.target.value, 10))}
                  >
                    <option value="">Seleccione</option>
                    {docentes.map(docente => (
                      <option key={docente.IDDOCENTE} value={docente.IDDOCENTE}>
                        {docente.APELLIDOS} &nbsp;&nbsp;{docente.NOMBRES} &nbsp;&nbsp;&nbsp;&nbsp;CI:{docente.CEDULA}
                      </option>
                    ))}
                  </select>
                  
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="sede" className="col-form-label">Requerimiento*:</label>
                </div>
                <div className="col-auto">
                  SEDE / DEPARTAMENTO / DENOMINACION / DEDICACION
                  <select
                    name="IDREQUERIMIENTO"
                    id="sede"
                    className="form-control"
                    value={selectedReq}
                    onChange={(e) => setSelectedReq(parseInt(e.target.value, 10))}
                  >
                    <option value="">Seleccione</option>
                    {reqs.map(req => (
                      <option key={req.IDREQUERIMIENTO} value={req.IDREQUERIMIENTO}>
                        {req.SEDE} /&nbsp;&nbsp;{req.DEPARTAMENTO} /&nbsp;&nbsp;{req.DENOMINACION} /&nbsp;&nbsp;{req.DEDICACION}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="fechaInicio" class="col-form-label">
                    Fecha Inicio Contrato*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="date"
                    name="FECHAINICIO"
                    id="fechaInicio"
                    class="form-control"
                    value={newContrato.FECHAINICIO}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="fechaFin" class="col-form-label">
                    Fecha Fin Contrato*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="date"
                    name="FECHAFIN"
                    id="fechaFin"
                    class="form-control"
                    value={newContrato.FECHAFIN}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="fuente" class="col-form-label">
                    Fuente Contrato
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="FUENTE"
                    id="fechaContrato"
                    class="form-control"
                    value={newContrato.FUENTE}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="fecha" class="col-form-label">
                    Fecha Contrato*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="date"
                    name="FECHA"
                    id="fecha"
                    class="form-control"
                    value={newContrato.FECHA}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label
                    for="certificacionPresupuestariaContrato"
                    class="col-form-label"
                  >
                    Certificación Presupuestaria Contrato*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="CERTIFICACION_PRESUPUESTARIA"
                    id="certificacion_Presupuestaria"
                    class="form-control"
                    value={newContrato.CERTIFICACION_PRESUPUESTARIA}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="idMemo" class="col-form-label">
                    ID Memo
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="IDMEMO"
                    id="idMemo"
                    class="form-control"
                    value={newContrato.IDMEMO}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="cargo" class="col-form-label">
                    Analista Del Proceso*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="ANALISTADELPROCESO"
                    id="cargo"
                    class="form-control"
                    value={newContrato.ANALISTADELPROCESO}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="archivoMemo" class="col-form-label">
                    Archivo Memo
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="ARCHIVOMEMO"
                    id="archivoMemo"
                    class="form-control"
                    value={newContrato.ARCHIVOMEMO}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="d-flex w-100 justify-content-center">
                <button type="button" onClick={handleReturn} className="w-5">
                  Regresar
                </button>
                <button type="button" onClick={handleClean} className="w-5">
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={handleAddContrato}
                  className="w-10"
                >
                  Agregar Contrato
                </button>
              </div>
            </div>
          </form>
        </div>
        {showMessage && <div>Contrato agregado correctamente</div>}
      </div>
    </section>
  );
};

export default AddCargo;
