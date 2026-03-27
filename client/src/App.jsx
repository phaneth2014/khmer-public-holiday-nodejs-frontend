import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Footer from "./components/FooterPage";
import "./App.css";

import { ThemeProvider } from "./components/ThemeProvider";

function App() {

  return (
    <ThemeProvider>
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
