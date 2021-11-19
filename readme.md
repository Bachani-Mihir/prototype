<h1 align="center">
  	<span>PROTOTYPE</span>
</h1>

## General Information

 - Everyone needs to checkout from ***master*** branch and shift it to their own branch
 - Run **npm install** after every pull from master branch

## Requirements

 -   Node.Js version v12.18.0 or higher. Follow [here](https://nodejs.org/en/download/) For Installing.
 -   NPM version 6.14.4 or higher. Follow [here](https://www.npmjs.com/get-npm) For Installing.
 -   Postman for API Testing. Follow [here](https://www.postman.com/downloads/) For Downloading Postman.
 -   Swagger for API Testing. Follow [here](https://swagger.io/) For Swagger Documentation. 
 -   Mongo DB for the database. Follow [here](https://www.mongodb.com/try/download/community) For Downloading MongoDB.

## Installation

-   Install All Modules

    ```sh
    Npm Install
    ```

    ```sh
    Npm Install --Force
    ```

## To Start An Application
   
 -  ```sh
    npm start
    ```

### Swagger documentation

-  Apis Which Are Documented With Swagger

    http://localhost:5000/api-docs

## .ENV Data

-   Make A .env File 
-   Then Copy This To Your env File

    ```sh
    SECRET=mihir
    SECRET1=vinay
    key= "2e35f242a46d67eeb74aabc37d5e5d05"

## Token Details

- Access Token = Access Token Is A JWT Signed Token Which Will Be Used In Some Of The API's And It Has A Expiry Time Of **2 hrs**.

- Refresh Token = Refresh Token Is Also A JWT Signed Token Which Is Used To Generate A New Access Token And It Has A Expiry Time Of **2 days**.

## For Testing Test Cases

-   ```sh
    npm install mocha
    ```
-   Set "scripts": {"test": "mocha"} In package.json

-   ```sh
    npm test
    ```