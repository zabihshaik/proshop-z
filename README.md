# ProShop-Z

A Full Stack Ecommerce Web App created using MERN Stack including Redux Toolkit in the Frontend, deployed on Render.

**Deployed Link:**

https://proshop-z.onrender.com/

Some screenshots:

Home Page:

![1](https://github.com/zabihshaik/proshop-z/assets/91183455/3fe4ed13-4955-4288-978f-a0bbc4e1e258)

![2](https://github.com/zabihshaik/proshop-z/assets/91183455/a5a6d504-e5a6-4ea1-90b7-8d00ab220407)

Product Page:

![product page](https://github.com/zabihshaik/proshop-z/assets/91183455/b1a00416-0ce8-44e3-aaa5-03a0346ad59b)

Empty Cart Page:

![Empty Cart Page](https://github.com/zabihshaik/proshop-z/assets/91183455/f601dbc1-6e4a-48f0-8c1c-0e8358faeb2e)

SignUp Page:

![Sign Up page](https://github.com/zabihshaik/proshop-z/assets/91183455/2ed8b14e-e85c-4689-baa3-1bebf71fbef1)

Sign In Page:

![Sign In page](https://github.com/zabihshaik/proshop-z/assets/91183455/8f86b487-4f98-4bcc-97f3-e6c716e764ba)







## Tech Stack used:

Frontend:

- ReactJS
-  React Bootstrap
- Redux
- Redux Toolkit

Backend:

- NodeJS
- ExpressJS

Database:

- MongoDB

#

- [Features](#features)
- [Usage](#usage)
  - [Env Variables](#env-variables)
  - [Install Dependencies (frontend & backend)](#install-dependencies-frontend--backend)
  - [Run](#run)
- [Build & Deploy](#build--deploy)
  - [Seed Database](#seed-database)

## Features

- Full featured shopping cart
- Product reviews and ratings
- Top products carousel
- Product pagination
- Product search feature
- User profile with orders
- Admin product management
- Admin user management
- Admin Order details page
- Mark orders as delivered option
- Checkout process (shipping, payment method, etc)
- PayPal / credit card integration
- Database seeder (products & users)

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- Create a PayPal account and obtain your `Client ID` - [PayPal Developer](https://developer.paypal.com/)

### Env Variables

Rename the `.env.example` file to `.env` and add the following

```
NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id
PAGINATION_LIMIT = 8
```

Change the JWT_SECRET and PAGINATION_LIMIT to what you want

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

### Seed Database

You can use the following commands to seed the database with some sample users and products as well as destroy all data

```
# Import data
npm run data:import

# Destroy data
npm run data:destroy
```

```
Sample User Logins

admin@email.com (Admin)
123456

john@email.com (Customer)
123456

jane@email.com (Customer)
123456
```
