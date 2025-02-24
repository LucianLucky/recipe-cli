#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const { addRecipe, getAllRecipes, searchRecipes } = require('../lib/storage');

program
  .version(pkg.version)
  .description('Recipe management CLI tool');

program
  .command('add <name>')
  .description('Add a new recipe')
  .option('-i, --ingredients <items>', 'Comma-separated ingredients')
  .option('-s, --steps <text>', 'Cooking instructions')
  .action((name, options) => {
    const recipe = {
      name,
      ingredients: options.ingredients ? options.ingredients.split(',').map(i => i.trim()) : [],
      instructions: options.steps || ''
    };
    if (addRecipe(recipe)) {
      console.log(`Recipe "${name}" added successfully!`);
    }
  });

program
  .command('list')
  .description('List all recipes')
  .action(() => {
    const recipes = getAllRecipes();
    if (recipes.length === 0) {
      console.log('No recipes found.');
      return;
    }
    recipes.forEach(recipe => {
      console.log(`\n[${recipe.id}] ${recipe.name}`);
      if (recipe.ingredients.length > 0) {
        console.log(`  Ingredients: ${recipe.ingredients.join(', ')}`);
      }
    });
  });

program
  .command('search <query>')
  .description('Search for recipes')
  .action((query) => {
    const results = searchRecipes(query);
    if (results.length === 0) {
      console.log(`No recipes found for "${query}"`);
      return;
    }
    console.log(`Found ${results.length} recipe(s):`);
    results.forEach(recipe => {
      console.log(`\n[${recipe.id}] ${recipe.name}`);
    });
  });

program.parse(process.argv);