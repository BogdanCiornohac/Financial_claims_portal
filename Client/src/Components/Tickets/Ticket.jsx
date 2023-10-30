import React, { useState } from "react";

import Button from "../Button/Button";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { BiTimeFive } from "react-icons/bi";
import Modal from "../Modal/Modal";
import { MdOutlineRemoveDone, MdOutlineDoneAll } from "react-icons/md";
import "./Ticket.css";

const Ticket = ({ title, author, text, status, pdf, isAdmin, approve, decline }) => {
  const [show, setShow] = useState(false);
  let icon;

  const statusHadler = () => {
    let rez;

    switch (status) {
      case "In progress": {
        rez = "inprogress";
        icon = <BiTimeFive />;
        break;
      }
      case "Rejected": {
        rez = "rejected";
        icon = <MdOutlineRemoveDone />;
        break;
      }
      default: {
        rez = "approved";
        icon = <MdOutlineDoneAll />;
        break;
      }
    }
    return rez;
  };

  return (
    <div className="card-container">
      <Modal show={show} reset={() => setShow(!show)} />
      <div className={`status ${statusHadler()}`}>
        {status}
        {icon}
      </div>
      <div className="text-container">
        <h2 className="ticket-title" onClick={() => setShow(true)}>
          {title}
        </h2>
        <h5>Submited by {author}</h5>
        <p>{text}</p>
        {!!pdf && (
          <a className="pdf-link" href={pdf} target="_blank">
            Oped PDF.
          </a>
        )}
      </div>
      {(isAdmin && status === 'In progress') && <div className="button-container">
        <Button title="Approve" icon={<AiOutlineEdit />} type="approve" onClick={approve} />
        <Button title="Decline" icon={<AiOutlineDelete />} type="decline" onClick={decline} />
      </div>}
    </div>
  );
};

export default Ticket;
