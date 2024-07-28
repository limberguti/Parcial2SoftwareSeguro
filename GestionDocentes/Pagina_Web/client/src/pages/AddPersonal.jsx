import React, { useState } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import hexagono from "../img/hexagono.png";

const AddPersonal = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [mensajeValidacion, setMensajeValidacion] = useState('');
  const [newDocente, setNewDocente] = useState({

    APELLIDOS: "",
    NOMBRES: "",
    CEDULA: "",
    NACIONALIDAD: "",
    GENERO: "",
    CORREO_PERSONAL: "",
    CORREO_INSTITUCIONAL: "",
    CIUDAD: "",
    PROVINCIA: "",
    NROPERSONAL: "",
    CAMPUSSEDEPERSONAL: "",
    OBSERVACIONESPERSONAL: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewDocente({
      ...newDocente,
      [name]: value,
    });
    if (validarCedula(value)) {
      setMensajeValidacion('Cédula válida');
    } else {
      setMensajeValidacion('Cédula inválida');
    }
  };

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionPersonal";
  };

  const handleClean = () => {
    // Limpiar el formulario después de agregar el personal
    setNewDocente({

      APELLIDOS: "",
      NOMBRES: "",
      CEDULA: "",
      NACIONALIDAD: "",
      GENEROPERSONAL: "",
      CORREO_PERSONAL: "",
      CORREO_INSTITUCIONAL: "",
      CIUDAD: "",
      PROVINCIA: "",
      NROPERSONAL: "",
      CAMPUSSEDEPERSONAL: "",
      OBSERVACIONESPERSONAL: "",
    });
  };

  const handleAddPersonal = () => {
    // Verificar si alguno de los campos obligatorios está vacío
    if (

      newDocente.APELLIDOS.trim() === "" ||
      newDocente.NOMBRES.trim() === "" ||
      newDocente.CEDULA.trim() === "" ||
      newDocente.NACIONALIDAD.trim() === "" ||
      newDocente.GENERO.trim() === "" ||
      //newPersonal.CORREOPERSONALPERSONAL.trim()===""||
      //newPersonal.CORREOINSTITUCIONALPERSONAL.trim()===""||
      newDocente.CIUDAD.trim() === "" ||
      newDocente.PROVINCIA.trim() === "" ||
      newDocente.NROPERSONAL.trim() === "" ||
      newDocente.CAMPUSSEDEPERSONAL.trim() === ""
      //newDocente.OBSERVACIONESPERSONAL.trim() === ""
    ) {
      // Mostrar una advertencia o mensaje al usuario
      alert("Por favor, llene todos los campos obligatorios.");
      return;
    }

    axios
      .post("http://localhost:8800/api/docente", newDocente)
      .then((response) => {
        console.log(response.data); // Puedes mostrar un mensaje de éxito o redirigir a otra página
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Limpiar el formulario después de agregar el personal
        setNewDocente({

          APELLIDOS: "",
          NOMBRES: "",
          CEDULA: "",
          NACIONALIDAD: "",
          GENERO: "",
          CORREO_PERSONAL: "",
          CORREO_INSTITUCIONAL: "",
          CIUDAD: "",
          PROVINCIA: "",
          NROPERSONAL: "",
          CAMPUSSEDEPERSONAL: "",
          OBSERVACIONESPERSONAL: "",
        });
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al agregar docente:", error);
      });
  };

  function validarCedula(cedula) {
    // Validar que la cédula tenga 10 dígitos
    if (cedula.length !== 10) {
      return false;
    }

    // Validar que los dos primeros dígitos sean válidos
    const provincia = parseInt(cedula.substring(0, 2));
    if (provincia < 1 || provincia > 24) {
      return false;
    }

    // Validar el último dígito usando el algoritmo de módulo 10
    const coeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
    let suma = 0;

    for (let i = 0; i < 9; i++) {
      const digito = parseInt(cedula.charAt(i)) * coeficientes[i];
      suma += (digito < 10) ? digito : digito - 9;
    }

    const ultimoDigitoCalculado = (10 - (suma % 10)) % 10;
    const ultimoDigitoReal = parseInt(cedula.charAt(9));

    return ultimoDigitoCalculado === ultimoDigitoReal;
    
  }


  return (
    <section className="add-personal">
      <div className="container">
        <header className="d-flex justify-content-center">
          <img src={LogoEspe} alt="" />
        </header>
        <div className="d-flex pt-2 pb-0 justify-content-center">
          <img src={hexagono} alt="" className="hexagono" />
          <h1>Agregar Nuevo Docente</h1>
        </div>
        <div className="row flex-grow-1">
          <form className="d-flex">
            <div className="col-lg-6">

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="apellidos" class="col-form-label">
                    {" "}
                    Apellidos*{" "}
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="APELLIDOS"
                    id="apellidos"
                    class="form-control"
                    value={newDocente.APELLIDOS}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="nombres" class="col-form-label">
                    Nombres*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="NOMBRES"
                    id="nombres"
                    class="form-control"
                    value={newDocente.NOMBRES}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="cedula" className="col-form-label">
                    Cedula*
                  </label>
                </div>
                <div className="col-auto">
                  <input
                    type="text"
                    name="CEDULA"
                    id="cedula"
                    className="form-control"
                    value={newDocente.CEDULA}
                    onChange={handleInputChange}
                    maxLength="10"
                  />
                  <p>{mensajeValidacion}</p>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="nacionalidad" class="col-form-label">
                    Nacionalidad*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="NACIONALIDAD"
                    id="nacionalidad"
                    class="form-control"
                    value={newDocente.NACIONALIDAD}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="genero" className="col-form-label">
                    Genero*
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="GENERO"
                    id="genero"
                    className="form-control"
                    value={newDocente.GENERO}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="MASCULINO">MASCULINO</option>
                    <option value="FEMENINO">FEMENINO</option>
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="correoP" class="col-form-label">
                    Correo Personal
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="email"
                    name="CORREO_PERSONAL"
                    id="correoP"
                    class="form-control"
                    value={newDocente.CORREO_PERSONAL}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="correoI" class="col-form-label">
                    Correo Institucional
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="email"
                    name="CORREO_INSTITUCIONAL"
                    id="correoI"
                    class="form-control"
                    value={newDocente.CORREO_INSTITUCIONAL}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>



            <div className="col-lg-6">
              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="ciudad" class="col-form-label">
                    Ciudad*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="CIUDAD"
                    id="ciudad"
                    class="form-control"
                    value={newDocente.CIUDAD}
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
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="provincia" class="col-form-label">
                    Provincia*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="PROVINCIA"
                    id="provincia"
                    class="form-control"
                    value={newDocente.PROVINCIA}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="Pichincha">Pichincha</option>
                    <option value="Tungurahua">Tungurahua</option>
                    <option value="Pastaza">Pastaza</option>
                    <option value="Cotopaxi">Cotopaxi</option>
                  </select>

                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="numeroP" class="col-form-label">
                    Numero Personal*
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="text"
                    name="NROPERSONAL"
                    id="numeroP"
                    class="form-control"
                    value={newDocente.NROPERSONAL}
                    onChange={handleInputChange}
                    required
                    pattern="[0-9]*"
                    maxLength="10"
                  />
                </div>
              </div>

              <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="genero" className="col-form-label">
                    CAMPUS*
                  </label>
                </div>
                <div className="col-auto">
                  <select
                    name="CAMPUSSEDEPERSONAL"
                    id="genero"
                    className="form-control"
                    value={newDocente.CAMPUSSEDEPERSONAL}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="Matriz">MATRIZ</option>
                    <option value="Unidad Académica Especial">UNIDAD ACADEMICA ESPECIAL</option>
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="observaciones" class="col-form-label">
                    Observaciones
                  </label>
                </div>
                <div class="col-auto">
                  <textarea
                    type="text"
                    name="OBSERVACIONESPERSONAL"
                    id="observaciones"
                    class="form-control"
                    value={newDocente.OBSERVACIONESPERSONAL}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="d-flex w-100 justify-content-center">
                <button type="button" onClick={handleReturn} className="w-15">
                  Regresar
                </button>
                <button type="button" onClick={handleClean} className="w-15">
                  Limpiar
                </button>
                <button
                  type="button"
                  onClick={handleAddPersonal}
                  className="w-25"
                >
                  Agregar Docente
                </button>
              </div>
            </div>
          </form>
        </div>
        {showMessage && <div>Docente agregado correctamente</div>}
      </div>
    </section>
  );
};

export default AddPersonal;
