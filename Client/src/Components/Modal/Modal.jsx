import React, { useContext } from "react";
import { redirect } from "react-router"
import { AiOutlineClose } from "react-icons/ai";
import "./Modal.css";
import { AuthContext } from "../Context/auth-context";

const Modal = ({ show, reset }) => {
  const auth = useContext(AuthContext);
  return (
    <>
      {show && <div className="backdrop" onClick={reset}></div>}
      {show && (
        <div className="modal">
          <div className="title--modal-container">
            <h2>Create New Ticket</h2>
            <AiOutlineClose className="close-icon" onClick={reset} />
          </div>
          <form className="modal-inputs" encType="multipart/form-data" action={`//localhost:3000/api/ticket/${auth.user.id}`} method="POST" >
            <input type="text" name="title" placeholder="Title" required />
            <label htmlFor="description" className="label">
              Add ticket description...
            </label>
            <textarea
              name="text"
              id="description"
              cols="30"
              rows="10"
              required
            />
            <input type="file" name="file" placeholder="Upload PDF" accept="pdf" required />
            <button>Submit</button>
          </form>

        </div >
      )}
    </>
  );
};

export default Modal;
