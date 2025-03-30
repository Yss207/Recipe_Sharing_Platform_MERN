import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AddFoodRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const navigate = useNavigate();

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value.split(",")
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;
    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeData);

    await axios
      .post("http://localhost:5000/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "bearer " + localStorage.getItem("token"),
        },
      })
      .then(() => navigate("/"));
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-5 mx-auto" style={{ maxWidth: "800px" }}>
        <h2 className="text-center mb-4">Add a New Recipe</h2>

        <form onSubmit={onHandleSubmit}>
          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Title:
            </label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control border-2"
                name="title"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Description:
            </label>
            <div className="col-md-8">
              <textarea
                type="text"
                className="form-control border-2"
                name="desc"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">Time:</label>
            <div className="col-md-8">
              <input
                type="text"
                className="form-control border-2"
                name="time"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Ingredients (comma-separated):
            </label>
            <div className="col-md-8">
              <textarea
                type="text"
                className="form-control border-2"
                name="ingredients"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Instructions:
            </label>
            <div className="col-md-8">
              <textarea
                className="form-control border-2"
                name="instructions"
                rows="3"
                onChange={onHandleChange}
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Category:
            </label>
            <div className="col-md-8">
              <select
                className="form-control border-2"
                name="category"
                value={recipeData.category || ""}
                onChange={onHandleChange}
              >
                <option value="">Select Category</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="European">European</option>
                <option value="Chinese">Chinese</option>
                <option value="Desserts & Beverages">
                  Desserts & Beverages
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-md-4 col-form-label fw-semibold">
              Recipe Image:
            </label>
            <div className="col-md-8">
              <input
                type="file"
                className="form-control border-2"
                name="file"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-dark w-50">
              Add Recipe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFoodRecipe;
