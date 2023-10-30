import React from "react";

import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";

const Modal = ({ show, reset }) => {
  return (
    <>
      {show && <div className="backdrop" onClick={reset}></div>}
      {show && (
        <div className="modal">
          <div className="title--modal-container">
            <h2>Create New Ticket</h2>
            <AiOutlineClose className="close-icon" onClick={reset} />
          </div>
          <div className="modal-inputs">
            <input type="text" placeholder="Title" />
            <placeholder htmlFor="description" className="placeholder">
              Add ticket description...
            </placeholder>
            <textarea
              name="Add ticket description..."
              id="description"
              cols="30"
              rows="10"
            />
            <input type="file" placeholder="Upload PDF" />
          </div>
          <button>Submit</button>
        </div>
      )}
    </>
  );
};

export default Modal;
