import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa";
import { MdFoodBank } from "react-icons/md";

const Favorites = () => {
  const navigate = useNavigate();
  const [favRecipes, setFavRecipes] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("fav")) ?? [];
    setFavRecipes(storedFavorites);
  }, []);

  const removeFavorite = (id) => {
    const updatedFavorites = favRecipes.filter((recipe) => recipe._id !== id);
    setFavRecipes(updatedFavorites);
    localStorage.setItem("fav", JSON.stringify(updatedFavorites));
  };

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div
        className="hero-section position-relative"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2022/05/03/20/01/black-forest-cake-7172587_1280.jpg")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "250px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          borderRadius: "8px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          className="overlay"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1,
          }}
        ></div>

        <div
          className="text-content position-relative"
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: "2.5rem",
            textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)",
            zIndex: 2,
            padding: "20px",
          }}
        >
          Your Favorite Recipes ❤️
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "normal",
              marginTop: "10px",
            }}
          >
            All your saved delicious picks in one place!
          </p>
        </div>
      </div>

      {/* Favorite Recipes Section */}
      {favRecipes.length === 0 ? (
        <p className="text-center">No favorite recipes yet. Go add some!</p>
      ) : (
        <div className="row mt-3">
          {favRecipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-3">
              <div
                className="card text-bg-light shadow-sm border-3"
                onDoubleClick={() => navigate(`/recipe/${recipe._id}`)}
                style={{
                  cursor: "pointer",
                  borderRadius: "12px",
                  overflow: "hidden",
                  transition:
                    "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow =
                    "0px 5px 15px rgba(0, 0, 0, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* Image */}
                <div
                  className="p-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`http://localhost:5000/images/${recipe.coverImage}`}
                    alt={recipe.title}
                    className="card-img-top"
                    style={{
                      width: "100%",
                      height: "170px",
                      objectFit: "cover",
                      borderRadius: "8px 8px 0 0",
                      display: "block",
                      transition: "transform 0.3s ease-in-out",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)";
                    }}
                  />
                </div>

                {/* Card Body */}
                <div
                  className="card-body p-2"
                  style={{
                    background: "#f9f9f9",
                    transition: "background 0.3s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f1f1f1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#f9f9f9";
                  }}
                >
                  <h6 className="fw-bold fs-5 mt-2">{recipe.title}</h6>
                  <hr className="my-2" />
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <MdFoodBank /> {recipe.category}
                  </div>
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
                    <BsStopwatchFill /> {recipe.time || "Unknown"}
                  </div>
                  <div className="text-center mt-2">
                    <FaHeart
                      onClick={() => removeFavorite(recipe._id)}
                      style={{
                        color: "red",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "scale(1.2)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
