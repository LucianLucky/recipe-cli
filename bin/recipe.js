#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');
const { addRecipe, getAllRecipes, searchRecipes, exportRecipes, importRecipes } = require('../lib/storage');
const { formatRecipe, formatRecipeList } = require('../lib/formatter');
const chalk = require('chalk');

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
      console.log(chalk.green(`✓ Recipe "${name}" added successfully!`));
    }
  });

program
  .command('list')
  .description('List all recipes')
  .action(() => {
    const recipes = getAllRecipes();
    console.log(formatRecipeList(recipes));
  });

program
  .command('search <query>')
  .description('Search for recipes')
  .action((query) => {
    const results = searchRecipes(query);
    console.log(formatRecipeList(results));
  });

program
  .command('export <filename>')
  .description('Export recipes to a JSON file')
  .action((filename) => {
    if (exportRecipes(filename)) {
      console.log(chalk.green(`✓ Recipes exported to ${filename}`));
    }
  });

program
  .command('import <filename>')
  .description('Import recipes from a JSON file')
  .action((filename) => {
    if (importRecipes(filename)) {
      console.log(chalk.green(`✓ Recipes imported from ${filename}`));
    }
  });

program.parse(process.argv);