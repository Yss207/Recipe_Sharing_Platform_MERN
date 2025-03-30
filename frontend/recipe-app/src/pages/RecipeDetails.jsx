import React, { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { FaUtensils, FaHeart, FaShareAlt } from "react-icons/fa";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function RecipeDetails() {
  const recipe = useLoaderData();
  const [isFavRecipe, setIsFavRecipe] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;
    const favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    setIsFavRecipe(favItems.some((item) => item._id === recipe._id));
  }, [recipe._id, token]);

  const handleFavorite = () => {
    if (!token) return;
    let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
    if (isFavRecipe) {
      favItems = favItems.filter((item) => item._id !== recipe._id);
    } else {
      favItems.push(recipe);
    }
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe(!isFavRecipe);
  };

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      alert("Recipe link copied to clipboard!");
    });
  };

  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6 text-center">
          <img
            src={`${API_BASE_URL}/images/${recipe.coverImage}`}
            className="img-fluid rounded shadow"
            alt={recipe.title}
            style={{ maxWidth: "100%", borderRadius: "12px" }}
          />
        </div>
        <div className="col-md-6">
          <h2 className="fw-bold">{recipe.title}</h2>
          <p className="text-muted fs-6">
            <FaUtensils className="me-2" />{" "}
            {recipe.category || "Unknown Cuisine"}
          </p>
          {recipe.name && (
            <p className="text-muted fs-6">
              <strong>Added by:</strong> {recipe.name}
            </p>
          )}
          <p className="text-size small">{recipe.desc}</p>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-4">
          <div className="p-3 border rounded shadow">
            <h4 className="fw-bold mb-3">Ingredients</h4>
            <ul
              className="ps-3"
              style={{ listStyleType: "disc", textAlign: "left" }}
            >
              {recipe.ingredients.map((item, index) => (
                <li key={index} className="mb-1">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-md-8">
          <div className="p-3 border rounded shadow">
            <h4 className="fw-bold mb-3">Cooking Instructions</h4>
            <ol className="text-start">
              {recipe.instructions
                .split(".")
                .filter((step) => step.trim() !== "")
                .map((step, index) => (
                  <li key={index} className="mb-2">
                    {step.trim()}.
                  </li>
                ))}
            </ol>
          </div>

          {token && (
            <>
              <button
                className={`btn ${
                  isFavRecipe ? "btn-danger" : "btn-outline-danger"
                } mt-3 me-2`}
                onClick={handleFavorite}
              >
                <FaHeart className="me-2" />
                {isFavRecipe ? "Remove from Favorites" : "Add to Favorites"}
              </button>

              <button
                className="btn btn-outline-primary mt-3"
                onClick={handleShare}
              >
                <FaShareAlt className="me-2" />
                Share This Recipe
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
