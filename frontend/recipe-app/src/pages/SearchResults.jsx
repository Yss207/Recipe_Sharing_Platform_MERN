import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BsStopwatchFill } from "react-icons/bs";
import { MdFoodBank } from "react-icons/md";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


const SearchResults = () => {
  const { searchTerm } = useParams();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        console.log(`Fetching results for: ${searchTerm}`);

        const response = await axios.get(
          `${API_BASE_URL}/recipe/search?query=${searchTerm}`
        );
        console.log("API Response:", response.data);

        setRecipes(response.data);
      } catch (err) {
        console.error("Error fetching search results:", err);
        setError("Failed to fetch search results.");
      }
      setLoading(false);
    };

    fetchResults();
  }, [searchTerm]);

  return (
    <div className="container" style={{marginTop:"60px"}}>
      <h2 className="text-center mb-4">Search Results for: "{searchTerm}"</h2>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-danger text-center">{error}</p>}

      {recipes.length > 0 ? (
        <div className="row">
          {recipes.map((recipe) => (
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
                <div className="p-2 text-center">
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
                  className="card-body p-2 text-center"
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

                  {/* Recipe Category */}
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <MdFoodBank /> {recipe.category}
                  </div>

                  {/* Cooking Time */}
                  <div className="d-flex justify-content-center align-items-center gap-2 mt-1">
                    <BsStopwatchFill /> {recipe.time || "Unknown"}
                  </div>

                  {/* View Button */}
                  <button
                    className="btn btn-outline-dark mt-3"
                    onClick={() => navigate(`/recipe/${recipe._id}`)}
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && <p className="text-center">No recipes found.</p>
      )}
    </div>
  );
};

export default SearchResults;
