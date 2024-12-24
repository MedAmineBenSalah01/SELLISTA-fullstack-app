# SELLISTA-fullstack-app

## Project Overview:
A full-stack application built with Vue.js on the frontend and GraphQL with Federation on the backend. This app allows users to filter products by category and price, and admins can edit product names.

## Installation


Client : 
```bash
cd client npm install && npm run dev
```

Server : 
## categories-service 

```bash
cd server
cd categories-service 
npm install && npm start
```
## products-service 

```bash
cd server
cd products-service 
npm install && npm start
```
## cateway-service
 
```bash
cd server
cd cateway-service 
npm install && npm start
```

## Features
Category Filter: Users can filter products by category.

Price Filter: Users can set a minimum and maximum price to filter products.

Admin Features: Admin users can edit product names directly from the UI. 

Responsive Design: The app adjusts for various screen sizes, making it mobile-friendly. 

Federation: The backend uses Apollo Federation to combine multiple GraphQL services into a single schema. 

Product Management: The backend allows fetching, updating, and managing product data.

## Usage

## Product Service 

Endpoint: http://localhost:4001/graphql

Playground usage :
Query product : 
![queryProduct](https://github.com/user-attachments/assets/d8260c55-c6f8-4472-9276-49c097f5b604)

Mutation updateProductName 

![updateProductName](https://github.com/user-attachments/assets/44da7523-834b-47b7-a8b8-1646f025d0f3)



## Categories Service
Endpoint: http://localhost:4001/graphql

Playground usage : 

Query Categories 

![queryCategory](https://github.com/user-attachments/assets/c755a0a9-b9b1-4bfe-b827-e00cba002168)


## Cateway Service

Endpoint: http://localhost:4000/

schema stitching and search query playground usage :

unified query :

```bash
query Products {
  products {
    id
    name
    price
    categoryId
    category {
     name
     id 
    }
  }
}
```

![unifiedSchema](https://github.com/user-attachments/assets/970e1210-6570-47f2-a8df-665b95cc72fe)


unified query search 

```bash
query($search: String) {
products(search: $search) {
id
name
price
category {
id
name
}
}
}
```

![Uploading unifiedschemasearch.PNG…]()


