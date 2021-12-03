# eCommerce-Website-React

## Overview
### Idea
- Users can check the name, brand, category, price, quantity, and rating of the item. 
- There are two types of users, one is "user", another one is "admin". 

### Login 
- Users have to register an account in order to access the website. 

### Register
- Users have to use a valid email.
- Users have to make a 8 to 20 characters password with at least one lowercase letter, one uppercase letter, and one number. 
- Users have to be at least 18 years old to register. 

### User side
- Users are able to get to two pages, "Dashboard" page and "Store" page.
- In the "Dashboard" page, users are allowed to buy or delete the items from their shopping carts. 
- In the "Store" page, users are allowed to add items to their shopping carts. 
- Also, users can search the items by the brand or category checkboxes on the left side of the "Store" page, or search the name of the item on the top of the "Store" page. 

### Admin side
- Admins are able to the "Products" page, which shows all the items. 
- Admins are able to filter the items by name, brand, category, price, quantity, and rating of the item list. 
- Also, admins can search the name of the item on the top of the "Products" page. 

## Tools/Techniques
- HTML
- CSS
- JavaScript
- Node.js
- React.js
- Hooks

## Installed packages
### Download Node.js
### `npm install -g npm`
### `npm install create-react-app -g`
### `npm install jquery --save`
### `npm install popper.js --save`
### `npm install bootstrap --save`
### `npm install json-server -g`
### `npm install react-router-dom --save`

## Setup the database
### `json-server ecommerce-db.json --watch --port=5000`

## Run
### `npm start`
