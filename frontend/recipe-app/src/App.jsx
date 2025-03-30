import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import MainNavigation from "./components/MainNavigation";
import axios from "axios";
import AddFoodRecipe from "./pages/AddFoodRecipe";
import EditRecipe from "./pages/EditRecipe";
import RecipeDetails from "./pages/RecipeDetails";
import MyRecipes from "./pages/MyRecipes";
import SearchResults from "./pages/SearchResults";
import AllRecipes from "./pages/AllRecipes";
import Favorites from "./pages/Favorites";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAllRecipes = async () => {
  let allRecipes = [];
  await axios.get(`${API_BASE_URL}/recipe`).then((res) => {
    allRecipes = res.data;
  });
  return allRecipes;
};

const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"));
  let allRecipes = await getAllRecipes();
  return allRecipes.filter((item) => item.createdBy === user._id);
};

const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav"));
};

const getRecipe = async ({ params }) => {
  let recipe;
  await axios
    .get(`${API_BASE_URL}/recipe/${params.id}`)
    .then((res) => (recipe = res.data));

  await axios.get(`${API_BASE_URL}/user/${recipe.createdBy}`).then((res) => {
    recipe = { ...recipe, email: res.data.email, name: res.data.name };
  });

  return recipe;
};

// Wrap all routes inside MainNavigation to include Navbar on all pages
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/search/:searchTerm", element: <SearchResults /> },
      { path: "/myRecipe", element: <MyRecipes />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Favorites />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe },
      { path: "/recipes", element: <AllRecipes /> },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
