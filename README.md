# SELLISTA-fullstack-app

## Project Overview: 
A full-stack application built with Vue.js on the frontend and GraphQL with Federation on the backend. This app allows users to filter products by category and price, and admins can edit product names.


## Features
Category Filter: Users can filter products by category.
Price Filter: Users can set a minimum and maximum price to filter products.
Admin Features: Admin users can edit product names directly from the UI.
Responsive Design: The app adjusts for various screen sizes, making it mobile-friendly.
Federation: The backend uses Apollo Federation to combine multiple GraphQL services into a single schema.
Product Management: The backend allows fetching, updating, and managing product data.


client/
├─src/
├── components/
│   ├── ProductCard.vue         # Displays individual product details and allows editing.
│   ├── Filter.vue              # Contains the filtering UI for category and price.
│   ├── SearchBar.vue           # Contains the search UI.
├── graphql/
│   ├── mutations.js            # Contains GraphQL mutations for updating products.
│   ├── queries.js              # Contains GraphQL queries for updating products.
├── App.vue                     # Main Vue component.
├── main.js                     # App entry point, sets up Apollo Client and mounts the app.
├── index.css                   # Global styles using Tailwind CSS.

server/
├── product-service/
│   ├── data                    # Product-related GraphQL API (Federated Service).
│   ├── utils                   # products utility
│   ├── index.js                # Apollo Server configuration and setup.
│   ├── resolvers.js            # resolvers.
│   ├── schema.js               # schema.
├── categories-service/
│   ├── data                    # Category-related GraphQL API (Federated Service).
│   ├── utils                   # categories utility
│   ├── index.js                # Apollo Server configuration and setup.
│   ├── resolvers.js            # resolvers.
│   ├── schema.js               # schema.
├── gateway-service/
│   ├── index.js                # Apollo Server configuration and setup.



## Installation

```
Frontend
```bash
cd client
npm install && npm run dev
```

```
backend
```bash
cd server
cd categories-service 
npm install && npm start

open a third terminal 
products-service
npm install && npm start

open a second terminal,
cd gateway-service
npm install && npm start

```




