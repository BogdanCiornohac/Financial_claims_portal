import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../Components/Context/auth-context";
import Ticket from "../Components/Tickets/Ticket";
import "./landing.css";

const LandingPage = () => {

  const [tickets, setTickets] = useState([]);
  const [reloadTickets, setReloadTickets] = useState(false);
  const [filter, setFilter] = useState(false);
  const auth = useContext(AuthContext);

  const getTickets = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${auth.user.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      setTickets(data.tickets);
      setReloadTickets(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getTickets().catch(err => console.log(err));
  }, [reloadTickets])

  const getStatus = (ticket) => {
    if (ticket.inProgress) {
      return 'In progress';
    } else {
      return ticket.aproved ? 'approved' : 'Rejected';
    }
  }

  const handleApprove = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/approve`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: auth.user.id })
      })
      const data = await response.json();
      if (!data.updated) {
        console.log('Server error')
      } else {
        setReloadTickets(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleDecline = async (ticketId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/ticket/${ticketId}/decline`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: auth.user.id })
      })
      const data = await response.json();
      if (!data.updated) {
        console.log('Server error')
      } else {
        setReloadTickets(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="landing-container">
      <h1>
        {tickets.length
          ? auth.user.isAdmin ? "All tickets" : "Your tickets"
          : "There are no tickets... Maybe create one?"}
      </h1>
      <button onClick={() => setFilter(curr => !curr)}>
        Show {filter ? "all tickets" : "tickets in progress"}
      </button>
      {tickets
        .filter((ticket) => {
          if (!filter || ticket.inProgress) {
            return true;
          }
          return false;
        })
        .map((ticket) => (
          <Ticket
            key={ticket.id}
            title={ticket.title}
            author={ticket.author.username}
            text={ticket.text}
            status={getStatus(ticket)}
            pdf={ticket.file}
            isAdmin={auth.user.isAdmin}
            approve={() => handleApprove(ticket.id)}
            decline={() => handleDecline(ticket.id)}
          />
        ))}
    </div>
  );
};

export default LandingPage;
