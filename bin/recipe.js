#!/usr/bin/env node

const { program } = require('commander');
const pkg = require('../package.json');

program
  .version(pkg.version)
  .description('Recipe management CLI tool');

program
  .command('add <name>')
  .description('Add a new recipe')
  .action((name) => {
    console.log(`Adding recipe: ${name}`);
  });

program
  .command('list')
  .description('List all recipes')
  .action(() => {
    console.log('Listing recipes...');
  });

program
  .command('search <query>')
  .description('Search for recipes')
  .action((query) => {
    console.log(`Searching for: ${query}`);
  });

program.parse(process.argv);