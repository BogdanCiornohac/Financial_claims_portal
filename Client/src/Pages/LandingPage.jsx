import React, { useState } from "react";

import Ticket from "../Components/Tickets/Ticket";
import "./landing.css";

const LandingPage = () => {
  const tickets = [
    {
      title: "Lorem Ipsum",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id mattis lectus, non pellentesque lorem. Nunc eu mauris congue, congue nunc eget, malesuada neque. Praesent consequat commodo elit, sit amet
iaculis leo tristique id. Suspendisse posuere porttitor tristique.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
posuere cubilia curae; Duis sed neque luctus, consectetur orci in,
vestibulum dolor. Morbi at mi ornare, convallis neque at, commodo
orci. Curabitur aliquet arcu sit amet enim lobortis, vel fermentum est
vulputate. Fusce semper nec mauris nec feugiat. Lorem ipsum dolor sit
amet, consectetur adipiscing elit.`,
      status: "In progress",
      pdf: "",
    },
    {
      title: "Lorem Ipsum",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id mattis lectus, non pellentesque lorem. Nunc eu mauris congue, congue nunc eget, malesuada neque. Praesent consequat commodo elit, sit amet
iaculis leo tristique id. Suspendisse posuere porttitor tristique.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
posuere cubilia curae; Duis sed neque luctus, consectetur orci in,
vestibulum dolor. Morbi at mi ornare, convallis neque at, commodo
orci. Curabitur aliquet arcu sit amet enim lobortis, vel fermentum est
vulputate. Fusce semper nec mauris nec feugiat. Lorem ipsum dolor sit
amet, consectetur adipiscing elit.`,
      status: "Rejected",
      pdf: "https://www.google.com",
    },
    {
      title: "Lorem Ipsum",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id mattis lectus, non pellentesque lorem. Nunc eu mauris congue, congue nunc eget, malesuada neque. Praesent consequat commodo elit, sit amet
iaculis leo tristique id. Suspendisse posuere porttitor tristique.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
posuere cubilia curae; Duis sed neque luctus, consectetur orci in,
vestibulum dolor. Morbi at mi ornare, convallis neque at, commodo
orci. Curabitur aliquet arcu sit amet enim lobortis, vel fermentum est
vulputate. Fusce semper nec mauris nec feugiat. Lorem ipsum dolor sit
amet, consectetur adipiscing elit.`,
      status: "Approved",
      pdf: "",
    },
    {
      title: "Lorem Ipsum",
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent id mattis lectus, non pellentesque lorem. Nunc eu mauris congue, congue nunc eget, malesuada neque. Praesent consequat commodo elit, sit amet
iaculis leo tristique id. Suspendisse posuere porttitor tristique.
Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
posuere cubilia curae; Duis sed neque luctus, consectetur orci in,
vestibulum dolor. Morbi at mi ornare, convallis neque at, commodo
orci. Curabitur aliquet arcu sit amet enim lobortis, vel fermentum est
vulputate. Fusce semper nec mauris nec feugiat. Lorem ipsum dolor sit
amet, consectetur adipiscing elit.`,
      status: "Approved",
      pdf: "",
    },
  ];

  return (
    <div className="landing-container">
      <h1>
        {tickets.length
          ? "Your tickets"
          : "There are no tickets... Maybe create one?"}
      </h1>
      {tickets.map((ticket, id) => (
        <Ticket
          key={id}
          title={ticket.title}
          text={ticket.text}
          status={ticket.status}
          pdf={ticket.pdf}
        />
      ))}
    </div>
  );
};

export default LandingPage;
