import React, { useState, useEffect } from "react";
import LogoEspe from "../img/logoespe.png";
import axios from "axios";

const SearchContrato = () => {
  //Api creada
 
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContr, setFilteredContr] = useState([]);
  
  const [selectedContractId, setSelectedContractId] = useState(null);
  const [selectedDocente, setSelectedDocente] = useState([]);
  const [selectedRequerimiento, setSelectedRequerimiento] = useState([]);
  const [selectedCargo,setSelectedCargo]=useState([]);
  const[selectedTiempo,setSelectedTiempo]=useState([]);
  useEffect(() => {
    if (selectedContractId !== null) {
      const selectedContract = filteredContr.find(contr => contr.IDCONTRATO === selectedContractId);
  
      if (selectedContract) {
        const docenteId = selectedContract.IDDOCENTE;
        const requerimientoId = selectedContract.IDREQUERIMIENTO;
  
        axios
          .get(`http://localhost:8800/api/docentesc/${docenteId}`)
          .then((response) => {
            console.log("Docente data:", response.data);
            setSelectedDocente(response.data);
          })
          .catch((error) => {
            console.error("Error fetching docente data:", error);
            setSelectedDocente([]);
          });
  
        axios
          .get(`http://localhost:8800/api/requerimientosc/${requerimientoId}`)
          .then((response) => {
            console.log("Requerimiento data:", response.data);
            setSelectedRequerimiento(response.data);
  
            const cargoId = response.data[0].IDCARGO;
            axios
              .get(`http://localhost:8800/api/cargosc/${cargoId}`)
              .then((cargoResponse) => {
                console.log("Cargo data:", cargoResponse.data);
                setSelectedCargo(cargoResponse.data);
  
                // Verificar si los datos de cargoResponse contienen la propiedad 'idtiempo'
                if (cargoResponse.data && cargoResponse.data[0] && cargoResponse.data[0].IDTIEMPO) {
                  const idTiempo = cargoResponse.data[0].IDTIEMPO;
                  axios
                    .get(`http://localhost:8800/api/tiemposc/${idTiempo}`)
                    .then((tiempoResponse) => {
                      console.log("Tiempo data:", tiempoResponse.data);
                      setSelectedTiempo(tiempoResponse.data);
                    })
                    .catch((error) => {
                      console.error("Error fetching tiempo data:", error);
                      setSelectedTiempo([]);
                    });
                } else {
                  console.error("No se encontró la propiedad 'idtiempo' en los datos de cargoResponse.");
                }
              })
              .catch((error) => {
                console.error("Error fetching cargo data:", error);
                setSelectedCargo([]);
              });
          })
          .catch((error) => {
            console.error("Error fetching requerimiento data:", error);
            setSelectedRequerimiento([]);
          });
  
      }
    }
  }, [selectedContractId, filteredContr]);
  
  

  

  const handleReturn = () => {
    // Redirigir al componente de inicio de sesión
    window.location.href = "http://localhost:3000/GestionContratos";
  };

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredContr([]);
      return;
    }

    const delayTimer = setTimeout(() => {
      axios
        .get(`http://localhost:8800/api/contrato/?search=${searchQuery}`)
        .then((response) => {
          setFilteredContr(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setFilteredContr([]);
        });
    }, 300);

    return () => clearTimeout(delayTimer);
  }, [searchQuery]);

  return (
    <section className="buscarp">
      <header className="d-flex justify-content-center">
        <img src={LogoEspe} alt="" className="logo-espe" />
      </header>
      <div className="contenido-buscar">
        <h2>Buscar Datos de Contratos</h2>
        <div className="search__container">
          <input
            type="text"
            placeholder="BUSCAR...."
            className="search__input"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
          <button
            type="button"
            onClick={handleReturn}
            className="search__return"
          >
            Regresar
          </button>
        </div>
        {filteredContr.length === 0 ? (
          <p>No se encontraron resultados</p>
        ) : (
          <div className="table-responsive">
           
            <table className="content-table">
              
              <thead>
                <tr>
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
              {filteredContr.map((contr) => (
  <React.Fragment key={contr.IDCONTRATO}>
    <tr onClick={() => setSelectedContractId(contr.IDCONTRATO)}>
      <td>{contr.IDCONTRATO}</td>
      <td>{contr.IDDOCENTE}</td>
      <td>{contr.IDREQUERIMIENTO}</td>
      <td style={{ width: "106px" }}>{contr.FECHAINICIO.substring(0, 10)}</td>
      <td style={{ width: "106px" }}>{contr.FECHAFIN.substring(0, 10)}</td>
      <td>{contr.FUENTE}</td>
      <td style={{ width: "106px" }}>{contr.FECHA.substring(0, 10)}</td>
      <td>{contr.CERTIFICACION_PRESUPUESTARIA}</td>
      <td>{contr.IDMEMO}</td>
      <td>{contr.ANALISTADELPROCESO}</td>
      <td>{contr.ARCHIVOMEMO}</td>
    </tr>
    {selectedContractId === contr.IDCONTRATO && (
      <>
      
        <tr>
        <h5>Docente:</h5>
          <td colSpan="11">
            <div>
              <tr style={{border:0}}>
                  <td>ID DOCENTE: {selectedDocente && selectedDocente.IDDOCENTE ? selectedDocente.IDDOCENTE : "-"}</td>
                  <td>APELLIDOS: {selectedDocente && selectedDocente.APELLIDOS ? selectedDocente.APELLIDOS : "-"}</td>
                  <td>NOMBRES: {selectedDocente && selectedDocente.NOMBRES ? selectedDocente.NOMBRES : "-"}</td>
                  <td>CEDULA: {selectedDocente && selectedDocente.CEDULA ? selectedDocente.CEDULA : "-"}</td>
                  <td>NACIONALIDAD: {selectedDocente && selectedDocente.NACIONALIDAD? selectedDocente.NACIONALIDAD : "-"}</td>
                  <td>GENERO: {selectedDocente && selectedDocente.GENERO? selectedDocente.GENERO : "-"}</td>
                  <td>CORREO INST: {selectedDocente && selectedDocente.CORREO_INSTITUCIONAL ? selectedDocente.CORREO_INSTITUCIONAL : "-"}</td>
                  <td>CIUDAD: {selectedDocente && selectedDocente.CIUDAD? selectedDocente.CIUDAD : "-"}</td>
                  <td>PROVINCIA: {selectedDocente && selectedDocente.PROVINCIA? selectedDocente.PROVINCIA : "-"}</td>
                  <td>NRO PERSONAL: {selectedDocente && selectedDocente.NROPERSONAL? selectedDocente.NROPERSONAL : "-"}</td>
                  <td>CAMPUS-SEDE: {selectedDocente && selectedDocente.CAMPUSSEDEPERSONAL ? selectedDocente.CAMPUSSEDEPERSONAL : "-"}</td>
              </tr>
            </div>
          </td>
        </tr>
        {/* Mostrar las filas de requerimiento */}
        {selectedRequerimiento.map((requerimiento) => (
          <tr key={requerimiento.IDREQUERIMIENTO}>
            <h5>Requerimiento:</h5>
            <td colSpan="11">
              <div>
                <tr style={{border: 0}}>
                <td>ID REQUERIMIENTO: {requerimiento.IDREQUERIMIENTO}</td>
                <td>ID CARGO:{requerimiento.IDCARGO}</td>
                <td>SEDE:{requerimiento.SEDE}</td>
                <td>DEPARTAMENTO:{requerimiento.DEPARTAMENTO}</td>
                <td>DENOMINACION:{requerimiento.DENOMINACION}</td>
                <td>DEDICACION:{requerimiento.DEDICACION}</td>
                </tr> 
              </div>
            </td>
          </tr>
        ))}
       
       {selectedCargo.map((cargo) => (
          <tr key={cargo.IDCARGO}>
            <h5>Cargo:</h5>
            <td colSpan="11">
              <div>
                <tr style={{border:0 }}>
                <td>ID CARGO: {cargo.IDCARGO}</td>
                <td>ID TIEMPO:{cargo.IDTIEMPO}</td>
                <td>TIPO PERSONAL:{cargo.TIPOPERSONAL}</td>
                <td>CATEGORIA:{cargo.CATEGORIA}</td>
                <td>NIVEL:{cargo.NIVEL}</td>
                <td>GRADO:{cargo.GRADO}</td>
                <td>REMUNERACION:{cargo.REMUNERACION}</td>
                </tr> 
              </div>
            </td>
          </tr>
        ))}
        {selectedTiempo.map((tiempo) => (
          <tr key={tiempo.IDTIEMPO}>
            <h5>Tiempo:</h5>
            <td colSpan="11">
              <div>
                <tr style={{border:0 }}>
                <td>ID TIEMPO:{tiempo.IDTIEMPO}</td>
                <td>DESCRIPCION:{tiempo.DESCRIPCION}</td>
                <td>CODIGO:{tiempo.CODIGO}</td>
                <td>HORAS:{tiempo.HORAS}</td>
                </tr> 
              </div>
            </td>
          </tr>
        ))}
      </>
    )}
   
  </React.Fragment>
))}

              </tbody>
            </table>
          </div>
        )}
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
export default SearchContrato;
