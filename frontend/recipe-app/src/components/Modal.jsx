import React from "react";
import "./Modal.css";

const Modal = ({ children, onClose }) => {
  return (
    <>
    <div className="backdrop" onClick={onClose}></div>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </>
  );
};


export default Modal;
