import React, { useState } from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import hexagono from "../img/hexagono.png";

const AddTiempo = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [newTiempo, setNewTiempo] = useState({

    DESCRIPCION: "",
    CODIGO: "",
    HORAS: ""
  });

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionTiempo";
  };

  const handleClean = () => {
    // Limpiar el formulario después de agregar el personal
    setNewTiempo({
        DESCRIPCION: "",
        CODIGO: "",
        HORAS: ""
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTiempo({
      ...newTiempo,
      [name]: value,
    });
  };

  const handleAddTiempo = () => {
    // Verificar si alguno de los campos obligatorios está vacío
    if (
      newTiempo.CODIGO.trim() === "" ||
      newTiempo.DESCRIPCION.trim() === "" ||
      newTiempo.HORAS.trim() === "" 
    ) {
      // Mostrar una advertencia o mensaje al usuario
      alert("Por favor, llene todos los campos obligatorios.");
      return;
    }

    axios
      .post("http://localhost:8800/api/tiempo", newTiempo)
      .then((response) => {
        console.log(response.data); // Puedes mostrar un mensaje de éxito o redirigir a otra página
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Limpiar el formulario después de agregar el tiempo
        setNewTiempo({
            DESCRIPCION: "",
            CODIGO: "",
            HORAS: ""
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
          <h1>Agregar Nuevo Tiempo</h1>
        </div>
        <div className="row flex-grow-1">
          <form className="d-flex">

            <div className="col-lg-12">

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="sede" class="col-form-label">Codigo*</label>
                </div>
                <div class="col-auto">
                <input
                    type="text"
                    name="CODIGO"
                    id="sede"
                    class="form-control"
                    value={newTiempo.CODIGO}
                    onChange={handleInputChange}
                  />
            
                  
                </div>
              </div>


              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="departamentoI" class="col-form-label">Horas*</label>
                </div>
                <div class="col-auto">
                  <input
                    type="number"
                    name="HORAS"
                    id="departamentoI"
                    class="form-control"
                    value={newTiempo.HORAS}
                    onChange={handleInputChange}
                  />
                </div>
              </div>


              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">Descripcion*</label>
                </div>
                <div class="col-auto">
                <select
                    name="DESCRIPCION"
                    id="tipoPI"
                    class="form-control"
                    value={newTiempo.DESCRIPCION}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="Tiempo completo">Tiempo completo</option>
                    <option value="Medio tiempo">Medio tiempo</option>
                    <option value="Tiempo parcial">Tiempo parcial </option>
                    

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
                <button type="button" onClick={handleAddTiempo} className="w-10">
                  Agregar Tiempo
                </button>
              </div>

            </div>
          </form>
        </div>
        {showMessage && <div>Tiempo agregado correctamente</div>}
      </div >
    </section >
  );
};

export default AddTiempo;
