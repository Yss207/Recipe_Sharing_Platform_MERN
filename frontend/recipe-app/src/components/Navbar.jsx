import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Modal from "./Modal";
import Inputform from "./Inputform";
import gsap from "gsap";

const Navbar = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);
  let user = JSON.parse(localStorage.getItem("user"));

  

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

    const logoRef = useRef(null);

    useEffect(() => {
      const letters = logoRef.current.children; // Get individual spans
      gsap.fromTo(
        letters,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" }
      );
    }, []);
  
  const checkLogin = () => {
    if (token) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsLogin(true);
    } else {
      setIsOpen(true);
    }
  };

  const addRecipe = () => {
    let token = localStorage.getItem("token");
    if (token) navigate("/addRecipe");
    else {
      setIsOpen(true);
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
    }
  };

  const performSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm.trim()}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-custom fixed-top">
        <div className="container-fluid">
          {/* Brand Logo */}
          <Link className="navbar-brand fancy-logo" to="/">
            <span ref={logoRef}>
              {"TastyTales".split("").map((letter, index) => (
                <span key={index} className="letter">
                  {letter}
                </span>
              ))}
            </span>
          </Link>

          {/* Navbar Toggle for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            {/* Centered Links */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to={"/recipes"}>
                  Recipes
                </Link>
              </li>
              <li
                className="nav-item"
                onClick={() => isLogin && setIsOpen(true)}
              >
                <Link className="nav-link" to={!isLogin ? "/favRecipe" : "/"}>
                  Favorites
                </Link>
              </li>
              <li className="nav-item" onClick={addRecipe}>
                <Link className="nav-link">Submit</Link>
              </li>
            </ul>
          </div>

          <form className="d-flex me-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch} // Press Enter to search
            />
            <button
              className="btn btn-outline-light"
              type="button"
              onClick={performSearch}
            >
              🔍
            </button>
          </form>

          {/* Right-aligned Login/Logout */}
          <ul className="navbar-nav d-flex align-items-center">
            {/* Profile Dropdown */}
            {!isLogin && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle text-dark"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <i className="bi bi-person-fill fs-5"></i>
                </a>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <span className="dropdown-item">
                      Welcome, {user?.name || "User"}!
                    </span>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/myRecipe">
                      My Recipes
                    </Link>
                  </li>
                  <li>
                    <button
                      className="dropdown-item logout-btn"
                      onClick={checkLogin}
                    >
                      Log Out
                    </button>
                  </li>
                </ul>
              </li>
            )}

            {/* Login Button (if not logged in) */}
            {isLogin && (
              <li className="nav-item">
                <button className="btn btn-outline-dark" onClick={checkLogin}>
                  Login
                </button>
              </li>
            )}
          </ul>
        </div>

        {/* Modal for Login/Register */}
        {isOpen && (
          <Modal onClose={() => setIsOpen(false)}>
            <Inputform setIsOpen={() => setIsOpen(false)} />
          </Modal>
        )}
      </nav>
    </>
  );
};

export default Navbar;
