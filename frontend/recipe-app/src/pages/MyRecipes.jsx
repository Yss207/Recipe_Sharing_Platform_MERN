import React from "react";
import { useLoaderData, Link } from "react-router-dom";
import { BsStopwatchFill } from "react-icons/bs";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MyRecipes = () => {
  const myRecipes = useLoaderData();
  const navigate = useNavigate();

  const onDelete = async (id) => {
    if (window.confirm("Are you sure you want to retire this recipe?")) {
      await axios.delete(`http://localhost:5000/recipe/${id}`);
      window.location.reload();
    }
  };

  return (
    <div className="container mt-5">
      {/* Hero Section */}
      <div
        className="hero-section position-relative"
        style={{
          backgroundImage: `url("https://cdn.pixabay.com/photo/2024/05/18/10/13/cheese-burger-8770017_1280.png")`,
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          My Recipes 📜
          <p
            style={{
              fontSize: "1.2rem",
              fontWeight: "normal",
              marginTop: "10px",
            }}
          >
            Your personal cookbook, ready to edit or delete!
          </p>
        </div>
      </div>

      {/* Recipes Section */}
      <div className="row mt-3">
        {myRecipes.length > 0 ? (
          myRecipes.map((recipe) => (
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
                    <BsStopwatchFill /> {recipe.category || "Unknown"}
                  </div>

                  {/* Action Icons */}
                  {/* Action Icons - Properly Aligned */}
                  <div className="d-flex justify-content-center align-items-center gap-4 mt-3">
                    {/* Edit Icon - Recipe Tune-Up */}
                    <Link
                      to={`/editRecipe/${recipe._id}`}
                      style={{
                        fontSize: "1.4rem",
                        color: "#28a745",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        display: "flex",
                        alignItems: "center", // Ensures vertical alignment
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      title="Tune-Up Your Recipe 📝"
                    >
                      <FaEdit />
                    </Link>

                    {/* Delete Icon - Recipe Retirement */}
                    <MdDelete
                      onClick={() => onDelete(recipe._id)}
                      style={{
                        fontSize: "1.5rem",
                        color: "#dc3545",
                        cursor: "pointer",
                        transition: "transform 0.2s ease-in-out",
                        display: "flex",
                        alignItems: "center", // Ensures vertical alignment
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.2)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                      title="Retire This Recipe 🗑️"
                    />
                  </div>

                  <div className="text-center mt-3">
                    <Link
                      to={`/recipe/${recipe._id}`}
                      className="btn btn-outline-dark"
                    >
                      View Recipe
                    </Link>
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
};

export default MyRecipes;
