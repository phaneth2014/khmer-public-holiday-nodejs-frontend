import React from "react";
import Calendar from "../components/Calendar.jsx";
import IPTracker from "../components/IPTracker";
export default function Home() {

  return (
    <div className="calendar-container">   
        <Calendar />     
        <IPTracker/>
    </div>
  );
}
