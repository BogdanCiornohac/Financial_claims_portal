import React, { useState } from "react";
import "./landing.css";

const LandingPage = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="landingpage-container">
      {/* <div
        className={`dot ${active && "active"}`}
        onClick={() => setActive(!active)}
      ></div> */}
    </div>
  );
};

export default LandingPage;
