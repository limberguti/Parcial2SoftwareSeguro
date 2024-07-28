import React from "react";
// Importa el archivo de estilos CSS para el modal

const ModalE = ({ closeModal2, children  }) => {
    const stopPropagation = (event) => {
        event.stopPropagation();
      };
    
  return (
    <div className="modal-container" onClick={closeModal2}>
       <div className="modal-content2" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};

export default ModalE;