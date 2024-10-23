import React from "react";
import MahakaLogo from "../../assets/images/mahakalogo.svg";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const address = "345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
  return (
    <footer className="w-full bg-[#124076] text-white">
      <div class="container mx-auto px-6 md:px-8">
        <div class="">footer</div>
      </div>
    </footer>
  );
}
