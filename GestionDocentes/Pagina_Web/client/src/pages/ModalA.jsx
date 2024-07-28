import React from "react";
// Importa el archivo de estilos CSS para el modal

const Modal = ({ closeModal, children  }) => {
    const stopPropagation = (event) => {
        event.stopPropagation();
      };
    
  return (
    <div className="modal-container" onClick={closeModal}>
       <div className="modal-content" onClick={stopPropagation}>
        {children}
      </div>
    </div>
  );
};

export default Modal;