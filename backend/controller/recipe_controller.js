const Recipes = require("../models/recipe")
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images')
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + '-' + file.originalname
        cb(null, filename)
    }
})

const upload = multer({ storage: storage })

const getRecipes = async (req, res) => {
    const recipes = await Recipes.find();
    return res.json(recipes);
}

const getRecipe = async (req, res) => {
    const recipe = await Recipes.findById(req.params.id);
    res.json(recipe);
}

const getRecipeByCategory = async (req, res) => {
    let category = req.params.category.replace("and", "&"); // Convert "and" to "&"

    // Define valid categories (with the correct combined category)
    const validCategories = ["Indian", "American", "European", "Chinese", "Desserts & Beverages"];

    if (!validCategories.includes(category)) {
        return res.status(400).json({ message: "Invalid category" });
    }

    try {
        const recipes = await Recipes.find({ category }); // Ensure Recipe model is used
        res.json(recipes);
    } catch (err) {
        res.status(500).json({ message: "Error fetching recipes" });
    }
};


const addRecipe = async (req, res) => {
    console.log(req.user);
    const { title, desc, ingredients, instructions, time, category } = req.body;

    if (!title || !ingredients || !instructions) {
        res.json({ message: "Required fields can't be empty" })
    }

    const coverImage = req.file ? req.file.filename : null; // Check if file exists

    const newRecipe = await Recipes.create({
        title, desc, ingredients, instructions, time, category, coverImage, createdBy: req.user.id
    })

    return res.json(newRecipe);
}

const editRecipe = async (req, res) => {
    const { title, desc, ingredients, instructions, category, time } = req.body;

    let recipe = await Recipes.findById(req.params.id)

    try {
        if (recipe) {
            let coverImage = req.file?.filename ? req.file?.filename : recipe.coverImage
            await Recipes.findByIdAndUpdate(req.params.id, { ...req.body, coverImage}, { new: true })
            res.json({ title, desc,ingredients, instructions, category, time })
        }
    }
    catch (err) {
        return res.status(404).json({ message: "error" })
    } 
}

const deleteRecipe = async (req, res) => {
    try {
        await Recipes.deleteOne({ _id: req.params.id })
        res.json({ status: "ok" })
    }
    catch (err) {
        return res.status(400).json({ message: "error" })
    }
}



// Fetch a random recipe
const getRandomRecipe = async (req, res) => {
    try {
        const randomRecipe = await Recipes.aggregate([{ $sample: { size: 1 } }]); // MongoDB random selection
        if (!randomRecipe.length) {
            return res.status(404).json({ message: "No recipes found" });
        }
        res.json(randomRecipe[0]); // Send the first (and only) result
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch random recipe" });
    }
};

// Search recipes by title
const searchRecipes = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) return res.status(400).json({ error: "Search query is required" });

        const recipes = await Recipes.find({
            title: { $regex: query, $options: "i" }, // Case-insensitive search
        });

        res.json(recipes);
    } catch (error) {
        console.error("Error searching recipes:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = { getRecipes, getRecipe, addRecipe, editRecipe, deleteRecipe, upload, getRandomRecipe, searchRecipes, getRecipeByCategory };