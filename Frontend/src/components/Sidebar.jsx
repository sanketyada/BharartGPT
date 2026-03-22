import React, { useContext, useState } from "react";
import { BharatContext } from "../context/BharatAiContext";
import "./Sidebar.css";

function Sidebar() {
  const [showSideBar, setShowSideBar] = useState(false);
  const { username } = useContext(BharatContext);
  return (
    // <div>
    //   {" "}
    //   <div className={showSideBar ? "sidebar" : "sidebarX"}>
    //     <div className="hamburgerSection">
    //       <button onClick={() => setShowSideBar(!showSideBar)}>
    //         {showSideBar ? "X" : "O"}
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <section className="sidebar">
      {/* new Chat Button */}
      <button>

        <img className="logo" src="src/assets/blacklogo.png" alt="" />
        <span>
          <i className="fa-solid fa-pen-to-square"></i>
        </span>
        
      </button>
      {/* History */}
      <ul className="histroy">
        <li>History1</li>
        <li>History1</li>
        <li>History1</li>
        <li>History1</li>
      </ul>
      {/* Comapny Name */}
      <div className="sign">
        <p>By BharatGPT</p>
      </div>
    </section>
  );
}

export default Sidebar;
