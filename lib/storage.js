const fs = require('fs');
const path = require('path');

const RECIPES_FILE = path.join(process.env.HOME, '.recipes.json');

function loadRecipes() {
  try {
    if (fs.existsSync(RECIPES_FILE)) {
      const data = fs.readFileSync(RECIPES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading recipes:', err.message);
  }
  return [];
}

function saveRecipes(recipes) {
  try {
    fs.writeFileSync(RECIPES_FILE, JSON.stringify(recipes, null, 2));
    return true;
  } catch (err) {
    console.error('Error saving recipes:', err.message);
    return false;
  }
}

function addRecipe(recipe) {
  const recipes = loadRecipes();
  recipes.push({
    id: Date.now(),
    name: recipe.name,
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || '',
    createdAt: new Date().toISOString()
  });
  return saveRecipes(recipes);
}

function getAllRecipes() {
  return loadRecipes();
}

function searchRecipes(query) {
  const recipes = loadRecipes();
  const lowerQuery = query.toLowerCase();
  return recipes.filter(recipe =>
    recipe.name.toLowerCase().includes(lowerQuery) ||
    recipe.ingredients.some(ing => ing.toLowerCase().includes(lowerQuery))
  );
}

module.exports = {
  addRecipe,
  getAllRecipes,
  searchRecipes
};