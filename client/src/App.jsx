import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";

import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [msg, setMsg] = useState("");
  const [backendurl, setBackendurl] = useState("");
 
  let appUrl = import.meta.env.VITE_APP_URL;
  const appLocal = import.meta.env.VITE_APP_LOCAL;
  if(appLocal =='local'){
    appUrl = import.meta.env.VITE_LOCAL_URL;
  }

  const callApi = async () => {
    setIsLoading(true);
     await fetch(`${appUrl}/api`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("✅ Success:", data);
        setMsg(`${data.status} - ${appLocal}`);
      })
      .catch((error) => {
        console.error("❌ Failed:", error.message);
      });
      setIsLoading(true);
  };

  const callApiBackend = async () => {
    console.log(backendurl);
    const backend = backendurl || import.meta.BACKEND_URL + "/api";
    await fetch(`${backend}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        
        console.log("✅ Success:", data);
        setMsg(data.message);
      })
      .catch((error) => {
        console.error("❌ Failed:", error.message);
      });

      
  };

  return (
    <>
      <div style={{ padding: 10 }}>
        <h5>React + Express + Netlify</h5>
        <button className="counter" onClick={callApi} disabled={isLoading}>
          Call API
        </button>
      </div>

      <div style={{ padding: 10 }}>
        <h5>React + Express + Netlify + other side</h5>
        <input
          type="text"
          className="input"
          value={backendurl}
          onChange={(e) => setBackendurl(e.target.value)}
        ></input>
        <br></br>
        <button className="counter" onClick={callApiBackend}>
          Call API backend
        </button>

      <br />
      <p className="counter">{msg}</p>  
      </div>

      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
      <div>version 1.0.2</div>
    </>
  );
}

export default App;
