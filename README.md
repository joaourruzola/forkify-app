[![Netlify Status](https://api.netlify.com/api/v1/badges/4c6f6851-6a3c-4de4-bfef-30393ee3f119/deploy-status)](https://app.netlify.com/sites/forkify-joaobraun/deploys)

# Forkify

A recipe search app: search for recipes, see cooking times and servings, bookmark favorites and add your own recipes. It uses the Forkify API for recipe data.

🔗 **Live demo:** https://forkify-joaobraun.netlify.app

> This project is based on the app built by [Jonas Schmedtmann](https://github.com/jonasschmedtmann) in his JavaScript course. It was made for learning purposes.

## Features

- Search recipes by keyword
- Paginated results
- Recipe details with servings that can be adjusted
- Bookmarks, kept in the sidebar
- Add your own recipes

## Architecture

The code follows the **MVC** pattern, split into modules:

- `model.js` holds application state and API calls
- `views/` renders each part of the interface
- `controller.js` connects views and model

It uses modern JavaScript (ES6+ classes and modules), SCSS for styles, and is bundled with Parcel and transpiled with Babel for older browsers.

## Tech Stack

- HTML5, SCSS
- JavaScript (ES6+)
- [Parcel](https://parceljs.org/) bundler
- Babel

## Getting Started

You need Node.js and npm.

```bash
npm install
npm start
```

Parcel serves the app at `http://localhost:1234`.

To create a production build in `dist/`:

```bash
npm run build
```

## Project Structure

```
├── index.html
└── src/
    ├── js/
    │   ├── controller.js     # Connects views and model
    │   ├── model.js          # State and API calls
    │   ├── config.js         # Configuration
    │   ├── helpers.js        # Helper functions
    │   └── views/            # View classes
    └── sass/                 # Stylesheets
```
