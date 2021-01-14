# Extremum eCommerce

This is a working real e-commerce project. It has been made with MERN stack and uses [Metro 4](https://metroui.org.ua/) as styling library.

This project was made for a company and this is the open source version. It's features all of the basics functionalities that an e-commerce needs. Including:

- Users authentication via Auth0.
- PayPal's payment wall.
- Admin dashboard to manage sales and CRM. (In progress)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## How to run this project

> **Note**: Actually to run this project you need your own **.env** file with the requirements listed [bellow](). However you should be able to run partially the frontend without it.

### Installation

In the project directory, you need to run:

#### `npm install`

### How to run the app

#### Frontend

For the frontend you simply need to run:

#### `npm start`

In the root directory and after installing all of the dependencies.

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />

#### Backend

To run the backend you need to be in the `/server` folder.
Once here you need to run:

#### `node index.js`

And if `.env` file is correctly configured it will connect with a MongoDB database and run a Express server.

### Configuring `.env` file

In order to run the app successfully you need to have a [MongoDB](https://www.mongodb.com/cloud/atlas) database running, preferably in the Atlas cloud service. You need also you own account and project created on [Auth0](https://auth0.com/).

```
CONNECTION_STRING=(your MongoDB connection string)
SESSION_SECRET=(very long random key)

REACT_APP_AUTH0_CLIENT_ID=(provided key in auth0)
REACT_APP_AUTH0_DOMAIN=your_company.selected_region.auth0.com
REACT_APP_AUTH0_CLIENT_SECRET=(provided key in auth0)

PAYPAL_CLIENT_ID=
```
