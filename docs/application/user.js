
    // /**
    //  * @swagger 
    //  * components:
    //  *  schemas:
    //  *    employee: 
    // *                   type: object
    // *                   properties:
    // *                     name:
    // *                       type: string
    // *                       example: "mihir"
    // *                     emailid:
    // *                       type: string
    // *                       example: "mihir@gmail.com"
    // *                     password:
    // *                       type: string
    // *                       example: "mihir@123"
    // */


    /**
     * @swagger
     * /employee/getuser:
     *      get:
     *          summary: Returns The List Of All The Books 
     *          tags: [Employee]
     *          responses:
     *              200:
     *                  description: The List Of All The Employees
     *                  
     */

    /**
     * @swagger
     * /employee/getuser/{name}:
     *  get:
     *      summary: Get The Employee By Name
     *      tags: [Employee]
     *      parameters:
     *          - in: path
     *            name: name
     *            schema:
     *              type: string
     *            required: true
     *            description: The Employee Name
     *      responses:
     *          200:
     *              description: The Employee Name By Id
     *          404:
     *              description: Employee Name Not Found
     */
    
    /**
     * @swagger
     * /employee/usersignup:
     *   post:
     *      summary: It Will Create The New Employee
     *      tags: [Employee]
     *      requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              name:
     *                  type: string
     *                  example: "vinay"
     *              emailid:
     *                  type: string
     *                  example: "vinay@gmail.com"
     *              password:
     *                  type: string
     *                  example: "vinay@123"
     *      responses:
     *          200:
     *              description: User Created Succesfully                        
     *      
     */

    /**
    * @swagger
     * /employee/usersignin:
     *   post:
     *      summary: user will signin
     *      tags: [Employee]
     *      requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              emailid:
     *                  type: string
     *                  example: "vinay@gmail.com"
     *              password:
     *                  type: string
     *                  example: "vinay@123"
     *      responses:
     *          200:
     *              description: User Created Succesfully                        
     *        
     */

    /**
    * @swagger
     * /employee/changepassword:
     *   put:
     *      security:
     *       - bearerAuth: []
     *      summary: It Will Change The Password
     *      tags: [Employee]
     *      requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              emailid:
     *                  type: string
     *                  example: "vinay@gmail.com"
     *              oldpassword:
     *                  type: string
     *                  example: "vinay@123"
     *              newpassword:
     *                  type: string
     *                  example: "Mihir@123"
     *      responses:
     *          200:
     *              description: Password Changed Successfully                        
     *        
     */