import React, { useEffect, useState } from "react";
import axios from "axios";
import { BsStopwatchFill } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const categories = [
  { name: "All", color: "#6c757d" },
  { name: "Indian", color: "#ff9800" },
  { name: "American", color: "#1e3a8a" },
  { name: "European", color: "#2e7d32" },
  { name: "Chinese", color: "#d32f2f" },
  { name: "Desserts & Beverages", color: "#ff69b4" },
];

export default function AllRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        let url = `https://tasty-tales-backend.onrender.com/recipe`;
        if (selectedCategory !== "All") {
          url = `https://tasty-tales-backend.onrender.com/recipe/category/${encodeURIComponent(
            selectedCategory
          )}`;
        }

        const res = await axios.get(url);
        setRecipes(res.data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
        setRecipes([]);
      }
    };

    fetchRecipes();
  }, [selectedCategory]);

  return (
    <div className="container mt-5">
      <div
        className="hero-section position-relative"
        style={{
          backgroundImage: `url("https://images.ctfassets.net/hphe2swm9scr/2jj93hdfeMlSdljkCCXhuS/6705fa78cd10d0ecad5fccce0716ebad/Rick.jpg")`,
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
          {selectedCategory === "All"
            ? "Explore Delicious Recipes 🍽️"
            : `${selectedCategory} Recipes 🍜`}
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "normal",
              marginTop: "10px",
            }}
          >
            Find & share your favorite dishes from the various categories
            available below.
          </p>
        </div>
      </div>

      <div className="d-flex justify-content-center gap-2 mb-3 mt-3 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat.name}
            className="btn category-btn"
            style={{
              backgroundColor:
                selectedCategory === cat.name ? cat.color : "#f8f9fa",
              color: selectedCategory === cat.name ? "#fff" : cat.color,
              border: `2px solid ${cat.color}`,
              transition: "all 0.3s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = cat.color;
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor =
                selectedCategory === cat.name ? cat.color : "#f8f9fa";
              e.target.style.color =
                selectedCategory === cat.name ? "#fff" : cat.color;
            }}
            onClick={() => setSelectedCategory(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="row">
        {recipes.length > 0 ? (
          recipes.map((recipe) => (
            <div key={recipe._id} className="col-md-4 mb-3">
              <div
                className="card text-bg-light shadow-sm border-3"
                onDoubleClick={() =>
                  (window.location.href = `/recipe/${recipe._id}`)
                }
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
                <div
                  className="p-2"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`https://tasty-tales-backend.onrender.com/images/${recipe.coverImage}`}
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
                <div
                  className="card-body p-2"
                  style={{
                    background: "#f9f9f9",
                    transition: "background 0.3s ease-in-out",
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
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No recipes found.</p>
        )}
      </div>
    </div>
  );
}
