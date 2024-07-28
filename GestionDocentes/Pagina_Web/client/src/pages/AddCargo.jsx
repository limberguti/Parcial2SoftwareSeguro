import React, { useState ,useEffect} from "react";
import axios from "axios";
import LogoEspe from "../img/logoespe.png";
import hexagono from "../img/hexagono.png";


const AddCargo = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [tiempos, setTiempos] = useState([]); // Estado para almacenar los tiempos
  const [selectedTiempo, setSelectedTiempo] = useState(""); // Estado para almacenar el tiempo seleccionado
  
  useEffect(() => {
    // Cargar la lista de tiempos desde la base de datos al montar el componente
    axios.get("http://localhost:8800/api/tiempos").then((response) => {
      setTiempos(response.data);
    });
  }, []);
  const [newCargo, setNewCargo] = useState({
    IDTIEMPO: selectedTiempo,
    TIPOPERSONAL: "",
    CATEGORIA: "",
    NIVEL: "",
    GRADO: "",
    REMUNERACION: "",
  });

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionCargo";
  };

  const handleClean = () => {
    // Limpiar el formulario después de agregar el personal
    setSelectedTiempo("");
    setNewCargo({ 
      TIPOPERSONAL: "",
      CATEGORIA: "",
      NIVEL: "",
      GRADO: "",
      REMUNERACION: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewCargo({
      ...newCargo,
      [name]: value,
    });
  };

  const cargoData = {
    IDTIEMPO: selectedTiempo, // Usar el tiempo seleccionado
    TIPOPERSONAL: newCargo.TIPOPERSONAL,
    CATEGORIA: newCargo.CATEGORIA,
    NIVEL: newCargo.NIVEL,
    GRADO: newCargo.GRADO,
    REMUNERACION: newCargo.REMUNERACION,
  };

  const handleAddCargo = () => {
    // Verificar si alguno de los campos obligatorios está vacío
    if (
      selectedTiempo === null ||
      newCargo.TIPOPERSONAL.trim() === "" ||
      newCargo.CATEGORIA.trim() === "" ||
      newCargo.NIVEL.trim() === "" ||
      newCargo.GRADO.trim() === "" ||
      newCargo.REMUNERACION.trim() === ""
    ) {
      // Mostrar una advertencia o mensaje al usuario
      alert("Por favor, llene todos los campos obligatorios.");
      return;
    }

    axios
      .post("http://localhost:8800/api/cargo", cargoData)
      .then((response) => {
        console.log(response.data); // Puedes mostrar un mensaje de éxito o redirigir a otra página
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Limpiar el formulario después de agregar el tiempo
       setSelectedTiempo("");
        setNewCargo({
          TIPOPERSONAL: "",
          CATEGORIA: "",
          NIVEL: "",
          GRADO: "",
          REMUNERACION: ""
        });
        setTimeout(() => {
          setShowMessage(false);
        }, 5000);
      })
      .catch((error) => {
        console.error("Error al agregar el cargo:", error);
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
          <h1>Agregar Nuevo Cargo</h1>
        </div>
        <div className="row flex-grow-1">
          <form className="d-flex">
            <div className="col-lg-12">
              
            <div className="row g-2 align-items-center">
                <div className="col-auto">
                  <label htmlFor="sede" className="col-form-label">Tiempo*:</label>
                </div>
                <div className="col-auto">
                  <select
                    name="IDTIEMPO"
                    id="sede"
                    className="form-control"
                    value={selectedTiempo}
                    onChange={(e) => setSelectedTiempo(parseInt(e.target.value, 10))}
                  >
                    <option value="">Seleccione</option>
                    {tiempos.map(tiempo => (
                      <option key={tiempo.IDTIEMPO} value={tiempo.IDTIEMPO}>
                        {tiempo.DESCRIPCION} /&nbsp;&nbsp;{tiempo.CODIGO} /&nbsp;&nbsp;{tiempo.HORAS}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">
                    Tipo de Personal*:
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="TIPOPERSONAL"
                    id="tipoPI"
                    class="form-control"
                    value={newCargo.TIPOPERSONAL}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="PERSONAL DE APOYO ACADEMICO">PERSONAL DE APOYO ACADEMICO</option>
                    <option value="PERSONAL ACADEMICO DE GRADO">PERSONAL ACADEMICO DE GRADO</option>
                    <option value="PERSONAL ACADEMICO DE FORMACION TECNICA Y TECNOLOG">PERSONAL ACADEMICO DE FORMACION TECNICA Y TECNOLOGICA</option>

                  </select>

                </div>
              </div>

               <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">
                    Categoria*:
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="CATEGORIA"
                    id="tipoPI"
                    class="form-control"
                    value={newCargo.CATEGORIA}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="PRINCIPAL">PRINCIPAL</option>
                    <option value="AGREGADO">AGREGADO</option>
                    <option value="AUXILIAR">AUXILIAR</option>
                    <option value="OCASIONAL">OCASIONAL</option>
                    <option value="PERSONAL DE APOYO">PERSONAL DE APOYO</option>

                  </select>

                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">
                    Nivel*:
                  </label>
                </div>
                <div class="col-auto">
                  <select
                    name="NIVEL"
                    id="tipoPI"
                    class="form-control"
                    value={newCargo.NIVEL}
                    onChange={handleInputChange}
                  >
                    <option value="">Seleccione</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>

                  </select>

                </div>
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">
                    Grado*:
                  </label>
                </div>
                <div class="col-auto">
                <select
                    name="GRADO"
                    id="tipoPI"
                    class="form-control"
                    value={newCargo.GRADO}
                    onChange={handleInputChange}
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
              </div>

              <div class="row g-2 align-items-center">
                <div class="col-auto">
                  <label for="tipoPI" class="col-form-label">
                    Remuneracion*:
                  </label>
                </div>
                <div class="col-auto">
                  <input
                    type="number"
                    name="REMUNERACION"
                    id="tipoPI"
                    class="form-control"
                    value={newCargo.REMUNERACION}
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
                  onClick={handleAddCargo}
                  className="w-10"
                >
                  Agregar Cargo
                </button>
              </div>
            </div>
          </form>
        </div>
        {showMessage && <div>Cargo agregado correctamente</div>}
      </div>
    </section>
  );
};

export default AddCargo;
