const express = require('express');
const { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload, getRandomRecipe, searchRecipes, getRecipeByCategory } = require('../controller/recipe_controller');
const verifyToken = require('../middleware/auth');
const router = express.Router();

router.get("/", getRecipes);//get all recipes
router.get("/random", getRandomRecipe); // Get a random recipe (NEW ROUTE)
router.get("/search", searchRecipes);
router.get("/category/:category", getRecipeByCategory);//get recipes by category
router.get("/:id", getRecipe);//get a recipe by id
router.post("/", upload.single('file'), verifyToken, addRecipe)//add recipe
router.put("/:id", upload.single('file'), verifyToken, editRecipe)//edit recipe
router.delete("/:id", deleteRecipe)//delete recipe
// Search route



module.exports = router;