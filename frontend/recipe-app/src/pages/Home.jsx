import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "./Home.css";
import Carousel from "../components/Carousel";
import Navbar from "../components/Navbar";
import Recipeitems from "../components/Recipeitems";
import Featured from "../components/Featured";

const Home = () => {
  const [visibleSections, setVisibleSections] = useState({});
  const carouselRef = useRef(null);
  const featuredRef = useRef(null);
  const recipeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const revealSection = (ref, sectionName) => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          if (rect.top < window.innerHeight - 50) {
            setVisibleSections((prev) => ({ ...prev, [sectionName]: true }));
          }
        }
      };

      revealSection(carouselRef, "carousel");
      revealSection(featuredRef, "featured");
      revealSection(recipeRef, "recipe");
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Run on mount

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <div className="row">
          <div
            ref={carouselRef}
            className={`col-12 fade-in ${
              visibleSections.carousel ? "visible" : ""
            }`}
          >
            <Carousel />
          </div>
          <div
            ref={featuredRef}
            className={`col-12 fade-in ${
              visibleSections.featured ? "visible" : ""
            }`}
          >
            <Featured />
          </div>
          <div
            ref={recipeRef}
            className={`col-12 fade-in ${
              visibleSections.recipe ? "visible" : ""
            }`}
          >
            <Recipeitems />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
