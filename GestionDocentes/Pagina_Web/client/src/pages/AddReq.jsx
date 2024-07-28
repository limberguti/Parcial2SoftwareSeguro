import React, { useState, useEffect } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import hexagono from "../img/hexagono.png";

const AddReq = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [cargos, setCargos] = useState([]); // Estado para almacenar los cargos
  const [selectedCargo, setSelectedCargo] = useState(""); // Estado para almacenar el cargo seleccionado

  useEffect(() => {
    // Cargar la lista de tiempos desde la base de datos al montar el componente
    axios.get("http://localhost:8800/api/cargos").then((response) => {
      setCargos(response.data);
    });
  }, []);

  const [newRequerimiento, setNewRequerimiento] = useState({
    IDCARGO: selectedCargo,
    DEPARTAMENTO: "",
    DENOMINACION: "",
    DEDICACION: "",
    SEDE: "",
  });

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionReq";
  };

  const handleClean = () => {
    // Limpiar el formulario después de agregar el personal
    setSelectedCargo("");
    setNewRequerimiento({
      DEPARTAMENTO: "",
      DENOMINACION: "",
      DEDICACION: "",
      SEDE: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewRequerimiento({
      ...newRequerimiento,
      [name]: value,
    });
  };

  const cargoData = {
    IDCARGO: selectedCargo, // Usar el cargo seleccionado
    DEPARTAMENTO: newRequerimiento.DEPARTAMENTO,
    DENOMINACION: newRequerimiento.DENOMINACION,
    DEDICACION: newRequerimiento.DEDICACION,
    SEDE: newRequerimiento.SEDE,
  };

  const handleAddReq = () => {
    // Verificar si alguno de los campos obligatorios está vacío
    if (
      selectedCargo === null ||
      newRequerimiento.DEPARTAMENTO.trim() === "" ||
      newRequerimiento.DENOMINACION.trim() === "" ||
      newRequerimiento.DEDICACION.trim() === "" ||
      newRequerimiento.SEDE.trim() === ""
    ) {
      // Mostrar una advertencia o mensaje al usuario
      alert("Por favor, llene todos los campos obligatorios.");
      return;
    }

    axios
      .post("http://localhost:8800/api/requerimiento", cargoData)
      .then((response) => {
        console.log(response.data); // Puedes mostrar un mensaje de éxito o redirigir a otra página
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Limpiar el formulario después de agregar el personal
        setSelectedCargo("");
        setNewRequerimiento({
          DEPARTAMENTO: "",
          DENOMINACION: "",
          DEDICACION: "",
          SEDE: ""
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
          <h1>Agregar Nuevo Requerimiento</h1>
        </div>
        <div className="row flex-grow-1">
          <form className="d-flex">
            <div className="col-lg-12">
            <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="sede" className="col-form-label">Cargo*:</label>
                </div>
                <div className="col-auto">
                  Tipo de Personal/Categoria/Nivel/Grado/Remuneracion
                  <select 
                    name="IDCARGO"
                    id="sede"
                    className="form-control"
                    value={selectedCargo}
                    onChange={(e) => setSelectedCargo(parseInt(e.target.value, 10))}
                  >
                    <option value="">Seleccione</option>
                    {cargos.map(cargo => (
                      <option key={cargo.IDCARGO} value={cargo.IDCARGO}>
                        {cargo.TIPOPERSONAL} /&nbsp;&nbsp;{cargo.CATEGORIA} /&nbsp;&nbsp;{cargo.NIVEL} /&nbsp;&nbsp;{cargo.GRADO} /&nbsp;&nbsp;{cargo.REMUNERACION}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="sede" class="col-form-label">
                    Sede*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="SEDE"
                    id="sede"
                    class="form-control"
                    value={newRequerimiento.SEDE}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="Matriz">MATRIZ</option>
                    <option value="UNIDAD ACADEMICA ESPECIAL">
                      UNIDAD ACADEMICA ESPECIAL
                    </option>
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="departamentoI" class="col-form-label">
                    Departamento*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="DEPARTAMENTO"
                    id="departamento"
                    class="form-control"
                    value={newRequerimiento.DEPARTAMENTO}
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
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="denominacionI" class="col-form-label">
                    Denominacion*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="DENOMINACION"
                    id="denominacion"
                    class="form-control"
                    value={newRequerimiento.DENOMINACION}
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
                      PERSONAL DE APOYO ACADÉMICO TÉCNICO DE INVESTIGACION
                    </option>
                  </select>
                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="dedicacionI" class="col-form-label">
                    Dedicacion*
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="DEDICACION"
                    id="dedicacion"
                    class="form-control"
                    value={newRequerimiento.DEDICACION}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="TIEMPO COMPLETO">TIEMPO COMPLETO</option>
                    <option value="TIEMPO PARCIAL">TIEMPO PARCIAL</option>
                    <option value="MEDIO TIEMPO">MEDIO TIEMPO</option>
                  </select>
                </div>
              </div>

              <div className="d-flex w-100 justify-content-center">
                <button type="button" onClick={handleReturn} className="w-5">
                  Regresar
                </button>
                <button type="button" onClick={handleClean} className="w-5">
                  Limpiar
                </button>
                <button type="button" onClick={handleAddReq} className="w-10">
                  Agregar Requerimiento
                </button>
              </div>
            </div>
          </form>
        </div>

        {showMessage && <div>Requerimiento agregado correctamente</div>}
      </div>
    </section>
  );
};

export default AddReq;
