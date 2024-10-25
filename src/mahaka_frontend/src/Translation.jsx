import React, { useEffect } from "react";

const TranslateButton = () => {
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
        { pageLanguage: "en" },
        "google_translate_element"
      );
    };

    const hidePoweredByGoogle = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .goog-logo-link { display: none !important; }
        .goog-te-gadget { font-size: 0 !important; }
        iframe[id^=":"] { display: none !important; }
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        #google_translate_element select {
          width: auto !important;
          max-width: 150px !important;
        }
        #google_translate_element select::-webkit-scrollbar {
          width: 0px;
        }
        #google_translate_element select {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
      `;
      document.head.appendChild(style);
    };

    addGoogleTranslate();
    hidePoweredByGoogle();
  }, []);

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
