# Recipe CLI

Command-line tool for managing recipes.

## Installation

```bash
npm install
```

## Usage

### Add a recipe

```bash
recipe add "Pasta Carbonara" -i "pasta,eggs,bacon,cheese" -s "Cook pasta, fry bacon, mix with eggs"
```

### List all recipes

```bash
recipe list
```

### Search recipes

```bash
recipe search pasta
```

### Export recipes

```bash
recipe export my-recipes.json
```

### Import recipes

```bash
recipe import backup.json
```

## Options

- `-i, --ingredients <items>`: Comma-separated list of ingredients
- `-s, --steps <text>`: Cooking instructions

## Storage

Recipes are stored in `~/.recipes.json`