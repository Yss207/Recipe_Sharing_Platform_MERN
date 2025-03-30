import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import wmImage from "../assets/wmremove-transformed.png";
import Modal from "./Modal";
import Inputform from "./Inputform";

const Carousel = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  let token = localStorage.getItem("token");
  const [isLogin, setIsLogin] = useState(token ? false : true);

  useEffect(() => {
    setIsLogin(token ? false : true);
  }, [token]);

  const addRecipe = () => {
    if (token) {
      navigate("/addRecipe");
    } else {
      setIsOpen(true); // Open the login modal if not logged in
    }
  };

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide" >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={wmImage}
              className="d-block w-100 carousel-img"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Welcome to TastyTales!</h5>
              <p>
                The go-to platform to explore unique & fresh recipes from around
                the world
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/205961/pexels-photo-205961.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100 carousel-img"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Discover New Flavors</h5>
              <p>
                Discover unique recipes from home chefs and food lovers, from
                classics to creative fusions—something for everyone!
              </p>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src="https://images.pexels.com/photos/2479242/pexels-photo-2479242.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="d-block w-100 carousel-img"
              alt="..."
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                borderRadius: "10px",
                padding: "10px",
              }}
            >
              <h5>Share Your Own Creations</h5>
              <p>
                Got a secret family recipe or a new dish you just perfected?
                Share it with the world!
              </p>
              <button
                onClick={addRecipe}
                className="btn btn-warning btn-lg fw-bold shadow-lg px-2 mt-2"
              >
                Submit Your Recipe 🚀
              </button>
            </div>
          </div>

          {/* Login Modal */}
          {isOpen && (
            <Modal onClose={() => setIsOpen(false)}>
              <Inputform setIsOpen={() => setIsOpen(false)} />
            </Modal>
          )}
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Carousel;
