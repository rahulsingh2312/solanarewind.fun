import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import burger from '../../../public/burger.svg'; // Adjust path if needed

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (navbarRef.current && !navbarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button className="md:hidden" onClick={toggleNavbar}>
        <Image alt="alt" src={burger} className="h-[17px] w-[25px]" />
      </button>
      {isOpen && (
        <div
          ref={navbarRef}
          className="fixed top-0 right-0 w-64 h-full bg-black text-white z-50 p-6 shadow-lg transition-transform transform translate-x-0"
        >
          <div className="flex justify-end">
            <button onClick={toggleNavbar}>&times;</button>
          </div>
          <ul className="mt-8 space-y-4">
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#docs">Docs</a></li>
            <li><a href="#onboarding">Onboarding</a></li>
          </ul>
        </div>
      )}
    </>
  );
}
