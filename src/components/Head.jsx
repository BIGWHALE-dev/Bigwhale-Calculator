import { useState, useEffect } from "react";
import "./Head.css";

function Head() {
  function themeHandler() {
    const storedtheme = localStorage.getItem("theme");
    if (storedtheme) return +storedtheme;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? 2 : 3;
  }
  const [theme, setTheme] = useState(themeHandler);

  useEffect(() => {
    localStorage.setItem("theme", `${theme}`);
    document.documentElement.setAttribute("data-theme", `${theme}`);

    const handler = (e) => setTheme(e.matches ? 2 : 3);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    media.addEventListener("change", handler);

    return () => removeEventListener("change", handler);
  }, [theme]);

  return (
    <div className="head">
      <p>calc</p>
      <div className="theme-container">
        <small>THEME</small>

        <div className="theme--selector">
          <div className="numbers">
            <span>1</span>
            <span>2</span>
            <span>3</span>
          </div>

          <div className="slider">
            <input
              type="radio"
              name="theme"
              id="theme-1"
              checked={theme === 1}
              onChange={(e) => e.target.checked && setTheme(1)}
            />
            <input
              type="radio"
              name="theme"
              id="theme-2"
              onChange={(e) => e.target.checked && setTheme(2)}
            />
            <input
              type="radio"
              name="theme"
              id="theme-3"
              onChange={(e) => e.target.checked && setTheme(3)}
            />
            <div className={`knob theme_${theme}`}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Head;
