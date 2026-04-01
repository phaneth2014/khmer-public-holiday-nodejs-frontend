import React, { Suspense, lazy, useEffect, useState } from "react";
import { Routes, Route,useLocation } from "react-router-dom";
import Header from "./layouts/Header";
import Footer from "./layouts/FooterPage";
import { ThemeProvider } from "./components/ThemeProvider";
import "./App.css";
import TopBarLoader from "./components/TopBarLoader";

// Lazy loading all page components
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Holiday = lazy(() => import('./pages/Holiday'));
const Exchange = lazy(() => import('./pages/Exchange'));
const Market = lazy(() => import('./pages/Market'));
const DataApi = lazy(() => import('./pages/DataApi'));
const Terms = lazy(() => import('./pages/Terms'));
const Register = lazy(() => import('./pages/auth/Register'));
const Login = lazy(() => import('./pages/auth/Login'));

function App() {
  const location = useLocation();
  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsNavigating(true);

    // 2. Hide the loader after a short delay (simulating a transition)
    const timer = setTimeout(() => setIsNavigating(false), 300);
    return () => clearTimeout(timer);
  }, [location]);
  return (
    <ThemeProvider>
      {isNavigating && <TopBarLoader/>}
      <Header />
      {/* Suspense handles the waiting state for any lazy route */}
      <Suspense fallback={<TopBarLoader/>}>
        <div className="main-content"> {/* Keeps layout stable */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/holiday" element={<Holiday />} />
            <Route path="/exchange-rate" element={<Exchange />} />
            <Route path="/market" element={<Market />} />
            <Route path="/api-data" element={<DataApi />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<div>404 - Not Found</div>} />
          </Routes>
        </div>
      </Suspense>

      <Footer />
    </ThemeProvider>
  );
}

export default App;