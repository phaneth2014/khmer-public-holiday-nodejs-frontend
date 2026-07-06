import React from "react";

export default function footerPage() {
  return (
    <div>
      ©2024-{new Date().getFullYear()} by Khmer Calendar App.  
      <div>
        <p>This site is powered by <a href="https://www.netlify.com">Netlify</a>.</p>
        <a href="https://www.netlify.com">
          <img
            src="https://www.netlify.com/assets/badges/netlify-badge-color-accent.svg"
            alt="Deploys by Netlify"
          />
        </a>
      </div>
    </div>
  );
}
