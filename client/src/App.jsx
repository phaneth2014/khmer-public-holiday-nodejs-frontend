import React from "react";

import "./App.css";
import "./Index.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/FooterPage";


function App() {
 
  return (
    <>
      <Header/>
      <Home/>
      <Footer/>
    </>
  );
}

export default App;