import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditRecipe = () => {
  const [recipeData, setRecipeData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/recipe/${id}`, {
          headers: { authorization: "Bearer " + localStorage.getItem("token") },
        });

        let res = response.data;

        setRecipeData({
          title: res.title,
          desc: res.desc,
          ingredients: res.ingredients.join(", "),
          instructions: res.instructions,
          time: res.time,
          category: res.category,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching recipe:", error);
        setError("Recipe not found or an error occurred.");
        setLoading(false);
      }
    };
    getData();
  }, [id]);

  const onHandleChange = (e) => {
    let val =
      e.target.name === "ingredients"
        ? e.target.value
        : e.target.name === "file"
        ? e.target.files[0]
        : e.target.value;

    setRecipeData((pre) => ({ ...pre, [e.target.name]: val }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(recipeData);

    const updatedRecipeData = {
      ...recipeData,
      ingredients: recipeData.ingredients.split(",").map((item) => item.trim()),
    };

    try {
      await axios.put(`${API_BASE_URL}/recipe/${id}`, updatedRecipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Error updating recipe:", err);
      setError("Failed to update recipe.");
    }
  };

  if (loading) return <div className="alert alert-info">Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow-sm p-4" style={{ width: "800px" }}>
        <h2 className="text-center mb-4">Edit Recipe</h2>
        <form onSubmit={onHandleSubmit}>
          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Title</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="title"
                onChange={onHandleChange}
                value={recipeData.title || ""}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Description</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="desc"
                onChange={onHandleChange}
                value={recipeData.desc || ""}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Time</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="time"
                onChange={onHandleChange}
                value={recipeData.time || ""}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Ingredients</label>
            <div className="col-sm-8">
              <input
                type="text"
                className="form-control"
                name="ingredients"
                onChange={onHandleChange}
                value={recipeData.ingredients || ""}
              />
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Instructions</label>
            <div className="col-sm-8">
              <textarea
                className="form-control"
                name="instructions"
                rows="3"
                onChange={onHandleChange}
                value={recipeData.instructions || ""}
              ></textarea>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Category</label>
            <div className="col-sm-8">
              <select
                className="form-control"
                name="category"
                value={recipeData.category || ""}
                onChange={onHandleChange}
              >
                <option value="">Select Category</option>
                <option value="Indian">Indian</option>
                <option value="American">American</option>
                <option value="European">European</option>
                <option value="Middle Eastern">Middle Eastern</option>
                <option value="Desserts & Beverages">
                  Desserts & Beverages
                </option>
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <label className="col-sm-4 col-form-label">Recipe Image</label>
            <div className="col-sm-8">
              <input
                type="file"
                className="form-control"
                name="file"
                onChange={onHandleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Edit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditRecipe;
