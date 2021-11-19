 const express = require('express');
 const cors = require('cors');
 
 const swaggerUI = require("swagger-ui-express");
 const swaggerJsDoc = require("swagger-jsdoc");

 const options = {
    definition: {
       openapi: "3.0.0",
       info: {
          title: "EMPLOYEE API",
          version: "1.0.0",
          description: "A Simple Express Employee API"
       },
       servers: [
          {
             url : "http://localhost:5000"
          }
       ]
    },
    apis: ["./docs/application/*.js"]
 } 

 const specs = swaggerJsDoc(options)

 const app = express();
 const port = 5000;                 
 const user = require('./routes/user/user');
 const profile = require('./routes/profile/profile');
 

      /** For Swagger */
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
    app.use(express.json());
    app.use(cors());
     
      /** For API's */
    app.use('/student',user);
    app.use('/',profile);
    app.listen(port,() => console.log(`app listening on ${port}`));
    
module.exports = app; 