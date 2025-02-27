const chalk = require('chalk');

function formatRecipe(recipe, detailed = false) {
  let output = chalk.bold.cyan(`\n${recipe.name}`);
  output += chalk.gray(` (ID: ${recipe.id})`);

  if (recipe.ingredients && recipe.ingredients.length > 0) {
    output += chalk.green('\n\nIngredients:');
    recipe.ingredients.forEach(ing => {
      output += `\n  • ${ing}`;
    });
  }

  if (detailed && recipe.instructions) {
    output += chalk.yellow('\n\nInstructions:');
    output += `\n${recipe.instructions}`;
  }

  if (recipe.createdAt) {
    const date = new Date(recipe.createdAt);
    output += chalk.gray(`\n\nAdded: ${date.toLocaleDateString()}`);
  }

  return output;
}

function formatRecipeList(recipes) {
  if (recipes.length === 0) {
    return chalk.yellow('No recipes found.');
  }

  let output = chalk.bold(`\nFound ${recipes.length} recipe(s):\n`);
  recipes.forEach(recipe => {
    output += formatRecipe(recipe, false);
    output += '\n';
  });

  return output;
}

module.exports = {
  formatRecipe,
  formatRecipeList
};