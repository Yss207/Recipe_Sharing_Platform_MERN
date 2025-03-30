import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";

const Featured = () => {
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRandomRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:5000/recipe/random");
        setRandomRecipe(response.data);
      } catch (error) {
        setError("Failed to fetch recipe");
      } finally {
        setLoading(false);
      }
    };

    fetchRandomRecipe();
  }, []);

  if (loading) {
    return <p className="text-center">Loading featured recipe...</p>;
  }

  if (error || !randomRecipe) {
    return (
      <p className="text-center text-danger">Error loading featured recipe.</p>
    );
  }

  return (
    <>
      <section className="container my-5">
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 position-relative">
            <img
              src={`http://localhost:5000/images/${randomRecipe.coverImage}`}
              alt={randomRecipe.title}
              className="img-fluid rounded"
              style={{
                width: "100%",
                maxWidth: "500px",
                height: "auto",
                objectFit: "cover",
              }}
            />
            <span className="badge bg-light text-dark position-absolute top-0 start-0 m-3 px-3 py-2 fw-bold">
              FEATURED RECIPE
            </span>
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h2 className="fw-bold">{randomRecipe.title}</h2>
            <p className="text-muted">{randomRecipe.desc}</p>
            <Link to={`/recipe/${randomRecipe._id}`} className="btn btn-outline-dark">View Recipe</Link>
          </div>
        </div>
      </section>
      <hr />
    </>
  );
};

export default Featured;
