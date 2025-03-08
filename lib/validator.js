function validateRecipe(recipe) {
  const errors = [];

  if (!recipe.name || recipe.name.trim() === '') {
    errors.push('Recipe name is required');
  }

  if (recipe.name && recipe.name.length > 100) {
    errors.push('Recipe name is too long (max 100 characters)');
  }

  if (recipe.ingredients && !Array.isArray(recipe.ingredients)) {
    errors.push('Ingredients must be an array');
  }

  if (recipe.instructions && typeof recipe.instructions !== 'string') {
    errors.push('Instructions must be a string');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

module.exports = { validateRecipe };