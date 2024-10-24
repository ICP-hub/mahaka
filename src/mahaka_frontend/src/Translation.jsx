import React, { useEffect } from "react";

const TranslateButton = () => {
  useEffect(() => {
    const addGoogleTranslate = () => {
      const script = document.createElement("script");
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    };

    const hidePoweredByGoogle = () => {
      const style = document.createElement("style");
      style.innerHTML = `
        .goog-logo-link { display: none !important; } /* Hide Google logo */
        .goog-te-gadget { font-size: 0 !important; } /* Hide gadget */
        iframe[id^=":"] { display: none !important; } /* Hide iframes */
        .goog-te-banner-frame { display: none !important; } /* Hide dialog box */
        body { top: 0 !important; } /* Remove space taken by dialog box */
         #google_translate_element select {
               
              width: auto !important; /* Set width to auto */
              max-width: 150px !important; /* Limit the width */

            }

             #google_translate_element select::-webkit-scrollbar {
          width: 0px; /* Completely hide the scrollbar */
        }

        #google_translate_element select {
          scrollbar-width: none; /* For Firefox */
          -ms-overflow-style: none; /* For Internet Explorer and Edge */
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
