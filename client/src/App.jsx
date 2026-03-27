import { Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import About from "./pages/About";
import Exchange from "./pages/Exchange";
import Market from "./pages/Market";
import Terms from './pages/Terms';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import Footer from "./components/FooterPage";
import "./App.css";

import { ThemeProvider } from "./components/ThemeProvider";
import Holiday from "./pages/Holiday";

function App() {

  return (
    <ThemeProvider>
      <Header />
      <Footer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/holiday" element={<Holiday />} />
        <Route path="/exchange-rage" element={<Exchange />} />
        <Route path="/market" element={<Market />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
