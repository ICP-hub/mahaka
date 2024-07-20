import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const address = "345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  return (
    <>
     <footer className="bg-[#124076] text-white p-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl mb-4">LOGO</div>
          <p>345 Faulconer Drive, Suite 4</p>
          <p>Charlottesville, CA, 12345</p>
        </div>
        <div>
          <p className="mb-2"><i className="fas fa-phone mr-2"></i>(123) 456-7890</p>
          <p className="mb-2"><i className="fas fa-envelope mr-2"></i><a href="mailto:info@example.com" className="text-white">mahaka@example.com</a></p>
          <p className="mb-2 cursor-pointer"><i className="fas fa-map-marker-alt mr-2 "></i>  <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer" className="text-white">
          {address}
        </a></p>
        </div>
        <div>
          <p className="mb-2">Social Media</p>
          <div className="flex space-x-4">
            <a href="#"><i className="text-lg fab fa-facebook-f"></i></a>
            <a href="#"><i className="text-lg fab fa-twitter"></i></a>
            <a href="#"><i className="text-lg fab fa-linkedin-in"></i></a>
            <a href="#"><i className="text-lg fab fa-youtube"></i></a>
            <a href="#"><i className="text-lg fab fa-instagram"></i></a>
            <a href="#"><i className="text-lg fab fa-google-plus-g"></i></a>
            <a href="#"><i className="text-lg fab fa-pinterest"></i></a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t  pt-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div className="md:col-span-2 flex gap-7">
            <a href="#">About us</a>
            <a href="#">Contact us</a>
            <a href="#">Help</a>
            <a href="#">Privacy Policy</a>
            <a href="#">Disclaimer</a>
          </div>
          <div className="md:text-right">Copyright © {currentYear} Lift Media Inc.</div>
        </div>
      </div>
    </footer>
    </>
  )
}
