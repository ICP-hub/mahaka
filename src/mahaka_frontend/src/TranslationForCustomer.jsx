import React, { useEffect } from "react";

const TranslationForCustomer = () => {
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
        {
          pageLanguage: "en",
          includedLanguages: "en,id", // Only English and Indonesian
        },
        "google_translate_element"
      );
    };

    const hidePoweredByGoogle = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .goog-logo-link, .goog-te-gadget span { display: none !important; }
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-banner-frame.skiptranslate { display: none !important; }
        body { top: 0px !important; }
        .goog-te-banner-frame { display: none !important; }
        .goog-te-menu-frame { display: none !important; }
        iframe[id^=":"] { display: none !important; }
        #google_translate_element select {
          color: white !important;
          background-color: #124076 !important;
          border: none !important;
          cursor: pointer !important;
          padding: 5px !important;
          text-transform: uppercase !important;
          font-weight: 530 !important;
          width: auto !important;
          max-width: 165px !important;
      
        }
        #google_translate_element select option {
          background-color: #124076 !important;
          color: white !important;
          font-weight: bold !important;
          padding: 5px !important;
          width: auto !important;
          max-width: 150px !important;
        }
        #google_translate_element select option:hover {
          background-color: #124076 !important;
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
      textAlign: "",
    },
    googleTranslateElement: {
      display: "",
      padding: "5px",
    },
    select: {
      border: "none",
      background: "transparent",
      fontSize: "14px",
      cursor: "pointer",
      padding: "5px",
    },
    selectFocus: {
      outline: "none",
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

export default TranslationForCustomer;
