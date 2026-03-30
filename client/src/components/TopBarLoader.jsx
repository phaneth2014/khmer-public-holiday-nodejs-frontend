import { useEffect } from "react";
import nprogress from "nprogress";
import "nprogress/nprogress.css";

const TopBarLoader = () => {
  useEffect(() => {
    nprogress.configure({
      showSpinner: false,
      trickleRate: 0.05, // How much it moves each step
      trickleSpeed: 300, // How often it moves (ms)
    });
    nprogress.start();

    // This runs when the component UNMOUNTS (meaning the page is ready)
    return () => {
      nprogress.done(true); // 'true' forces it to finish immediately
    };
  }, []);

  return null;
};

export default TopBarLoader;
