import React, { useEffect } from "react";

const TranslateButton = ({ isDarkMode }) => {
 // console.log("dark mode in translation",isDarkMode)
  useEffect(() => {
    const addGoogleTranslate = () => {
      if (!document.querySelector("#google-translate-script")) {
        const script = document.createElement("script");
        script.id = "google-translate-script";
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", includedLanguages: "en,id" },
        "google_translate_element"
      );
    };

    const applyStyles = () => {
      const style = document.createElement("style");
      style.id = "custom-translate-styles";
      style.innerHTML = `
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { font-size: 0 !important; }
        iframe[id^=":"] { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        #google_translate_element select {
          width: auto !important;
          max-width: 150px !important;
          background-color: ${
            isDarkMode === "dark" ? "#1a202c" : "#ffffff"
          } !important; /* Background color */
          color: ${isDarkMode === "dark" ? "#ffffff" : "black"} !important; /* Text color */
         
        }
        #google_translate_element select::-webkit-scrollbar {
          width: 0px;
        }
        #google_translate_element select {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `;
      const existingStyle = document.querySelector("#custom-translate-styles");
      if (existingStyle) {
        existingStyle.remove();
      }
      document.head.appendChild(style);
    };

    addGoogleTranslate();
    applyStyles();
  }, [isDarkMode]);

  const styles = {
    translateContainer: {
      margin: "20px",
      textAlign: "right",
    },
    googleTranslateElement: {
      position: "absolute",
      top: "27%",
      right: "20%",
      display: "inline-block",
      padding: "5px",
    },
  };

  return (
    <div style={styles.translateContainer}>
      <div
        id="google_translate_element"
        style={styles.googleTranslateElement}
      ></div>
    </div>
  );
};

export default TranslateButton;
