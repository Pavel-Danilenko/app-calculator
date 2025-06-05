"use client";
// components/CookieBanner.js
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const CookieBanner = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = Cookies.get("cookieConsent");
      if (!consent) {
        setShowBanner(true);
      } else {
        setShowBanner(false);
      }
    }
  }, []);

  const handleClose = () => {
    Cookies.set("cookieConsent", "true", { expires: 365 });
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1B1464] text-white p-4 z-50">
      <div className="relative flex justify-between items-center w-full">
        <p className="text-sm lg:m-0 m-2 text-center w-full">
          We use cookies to improve your experience. By using our website, you
          agree to our use of cookies.
        </p>
        <button
          className="lg:absolute lg:m-0 m-2 right-0 text-white px-4 py-2 rounded border border-1 border-white"
          onClick={handleClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CookieBanner;
