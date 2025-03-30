import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

const MainNavigation = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <footer
        className="text-center text-light py-3 mt-4"
        style={{
          background: "#333",
          color: "#fff",
          position: "relative",
          width: "100%",
        }}
      >
        <p className="mb-0">
          &copy; {new Date().getFullYear()} TastyTales | All Rights Reserved 🍽️
        </p>
      </footer>
    </>
  );
}

export default MainNavigation
