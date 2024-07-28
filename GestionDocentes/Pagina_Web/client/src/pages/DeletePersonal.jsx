import React, { useState } from 'react';
import axios from 'axios';

const DeletePersonal = () => {
  const [cedula, setCedula] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setCedula(value);
  };

  const handleDeletePersonal = () => {
    axios
      .delete(`http://localhost:8800/api/personal/${cedula}`)
      .then((response) => {
        console.log(response.data);
        // Mostrar el mensaje de éxito
        setShowMessage(true);
        // Restablecer el estado de la cédula
        setCedula('');
        // Puedes agregar un tiempo para ocultar el mensaje después de unos segundos
        setTimeout(() => {
          setShowMessage(false);
        }, 8000); // El mensaje se ocultará después de 3 segundos (ajusta el tiempo según tus preferencias)
      })
      .catch((error) => {
        console.error('Error al eliminar personal:', error);
      });
  };

  return (
    <div>
      <h2>Eliminar Personal</h2>
      <form>
        <br></br>
        Ingrese la cédula del Personal que desea eliminar
        <label>
          Cédula del Personal:
          <input
            type="text"
            name="cedula"
            value={cedula}
            onChange={handleInputChange}
          />
        </label>
        <button type="button" onClick={handleDeletePersonal}>
          Eliminar Personal
        </button>
      </form>
      {showMessage && <div>Personal eliminado correctamente...</div>}
    </div>
  );
};

export default DeletePersonal;
