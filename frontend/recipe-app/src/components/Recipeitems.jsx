import React, { useState } from "react";
import axios from "axios";
import { BsStopwatchFill } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
import { Link, useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Recipeitems = () => {
  const navigate = useNavigate();
  const initialRecipes = useLoaderData(); // Load recipes initially
  const [allRecipes, setAllRecipes] = useState(initialRecipes); // Store in state

  const path = window.location.pathname === "/myRecipe"; // Boolean flag

  let favItems = JSON.parse(localStorage.getItem("fav")) ?? [];
  const [isFavRecipe, setIsFavRecipe] = useState(false);

  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/recipe/${id}`);
      setAllRecipes((recipes) => recipes.filter((recipe) => recipe._id !== id));
      let filterItem = favItems.filter((recipe) => recipe._id !== id);
      localStorage.setItem("fav", JSON.stringify(filterItem));
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  const favRecipe = (item) => {
    let filterItem = favItems.filter((recipe) => recipe._id !== item._id);
    favItems =
      favItems.filter((recipe) => recipe._id === item._id).length === 0
        ? [...favItems, item]
        : filterItem;
    localStorage.setItem("fav", JSON.stringify(favItems));
    setIsFavRecipe((pre) => !pre);
  };

  return (
    <div className="container mt-2">
      <h2 className="my-3 text-center  fw-bold">
        Latest Recipes
      </h2>
      <div className="row gx-2 gy-3 justify-content-center">
        {allRecipes?.slice(0, 6).map((item) => (
          <div key={item._id} className="col-md-4 col-sm-6">
            <div
              className="card text-bg-light shadow-sm border-3"
              onDoubleClick={() => navigate(`/recipe/${item._id}`)}
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
              {/* Background effect behind image */}
              <div
                className="p-2"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`http://localhost:5000/images/${item.coverImage}`}
                  alt={item.title}
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

              {/* Card Body with animation effect */}
              <div
                className="card-body p-2"
                style={{
                  background: "#f9f9f9",
                  transition: "background 0.3s ease-in-out",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f1f1f1"; // Slight darkening effect
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#f9f9f9";
                }}
              >
                <h6 className="fw-bold fs-5 mt-2">{item.title}</h6>
                <hr className="my-2" />
                <div className="d-flex justify-content-center align-items-center gap-2">
                  <MdFoodBank /> {item.category}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Recipes Button */}
      <div className="mt-4 justify-content-center d-flex">
        <button
          className="btn btn-outline-primary fw-bold"
          onClick={() => navigate("/recipes")}
          style={{
            fontSize: "1.1rem",
            padding: "10px 20px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            borderRadius: "8px",
            borderWidth: "2px",
            position: "relative",
            overflow: "hidden",
            transition: "all 0.3s ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector(".arrow").style.transform =
              "translateX(5px)";
            e.currentTarget.style.textShadow =
              "0px 0px 8px rgba(255, 255, 255, 0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector(".arrow").style.transform =
              "translateX(0)";
            e.currentTarget.style.textShadow = "none";
          }}
        >
          <span
            className="arrow"
            style={{ transition: "transform 0.3s ease-in-out" }}
          >
            ➡
          </span>
          View All Recipes
        </button>
      </div>
    </div>
  );
};

export default Recipeitems;
