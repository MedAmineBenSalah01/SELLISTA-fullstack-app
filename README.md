# SELLISTA-fullstack-app

## Project Overview:
A full-stack application built with Vue.js on the frontend and GraphQL with Federation on the backend. This app allows users to filter products by category and price, and admins can edit product names.

## Installation


Client : 
```bash
cd client npm install && npm run dev
```

## main layout
![mainlayout](https://github.com/user-attachments/assets/4a9676e9-1ae6-41bf-a00c-4cdd11b42c01)

## Search for products 

![search](https://github.com/user-attachments/assets/f033288f-8372-411c-83d4-502303b9e690)

## filter by categories 

![ndcategories](https://github.com/user-attachments/assets/4c2dbc82-ad53-48cb-8525-61a328499c08)

![categoires](https://github.com/user-attachments/assets/cc880f06-0a6a-4b9f-b8fa-4d8b11587cb0)

## filter by min/max price

![minmaxprice](https://github.com/user-attachments/assets/b1787fea-59d3-425b-bf48-147b221b1638)

## update product name 

![testnameupdate](https://github.com/user-attachments/assets/9fb1e16f-477c-43cf-994f-311d813703b3)


## update products ui after name changing

![testnameupdatecomplete](https://github.com/user-attachments/assets/5fd28e0c-856e-43cc-9754-ade4c7d73c95)








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
![queryProduct](https://github.com/user-attachments/assets/d8260c55-c6f8-4472-9276-49c097f5b604)

Mutation updateProductName 

```bash
mutation Mutation($updateProductNameId: ID!, $name: String!) {
  updateProductName(id: $updateProductNameId, name: $name) {
    name
  }
}
```
![updateProductName](https://github.com/user-attachments/assets/44da7523-834b-47b7-a8b8-1646f025d0f3)

variables added here : 

![var](https://github.com/user-attachments/assets/e27ead86-c194-4aab-98ac-d3f46712dc6d)



## Categories Service
Endpoint: http://localhost:4001/graphql

Playground usage : 

Query Categories 
```bash
query Categories {
  categories {
    name
    id
  }
}
```
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


![unifiedschemasearch](https://github.com/user-attachments/assets/ba613a49-9a06-4a8f-bd6c-215be6f32add)

