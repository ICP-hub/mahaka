import React from "react";
import { useEffect } from "react";

const TranslationForCustomer = () => {
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
             .goog-logo-link, .goog-te-gadget span { display: none !important; } /* Hide Google logo and text */
        .goog-te-gadget { font-size: 0 !important; }
        .goog-te-banner-frame.skiptranslate { display: none !important; } /* Hide Google Translate toolbar */
        body { top: 0px !important; } /* Adjust body position to remove space taken by toolbar */
        .goog-te-banner-frame { display: none !important; } /* Hide Google Translate frame */
        .goog-te-menu-frame { display: none !important; } 

         iframe[id^=":"] { display: none !important; }
            #google_translate_element select {
              color: white !important;
              background-color: #124076 !important;
              border: none !important;
              !important;
              cursor: pointer !important;
              padding: 5px !important;
              text-transform: uppercase !important; /* Make placeholder text uppercase */
              font-weight: 530 !important; /* Make placeholder text extra bold */
              width: auto !important; /* Set width to auto */
              max-width: 165px !important; /* Limit the width */

            }
            #google_translate_element select option {
              background-color: #124076!important; /* Dropdown option background */
              color: white !important; /* Dropdown option text color */
              font-weight: bold !important; /* Make dropdown text bold */
              padding: 5px !important; /* Add padding for better visibility */
            width: auto !important; /* Set width to auto */
              max-width: 150px !important; /* Limit the width */
            }
            #google_translate_element select option:hover {
              background-color:  #124076 !important; /* Change background on hover */
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
      textAlign: "right",
    },
    googleTranslateElement: {
      display: "inline-block",
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
