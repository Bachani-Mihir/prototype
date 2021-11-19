
    // /**
    //  * @swagger 
    //  * components:
    //  *  schemas:
    //  *    Student: 
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
     * /student/getuser:
     *      get:
     *          summary: Returns The List Of All The Books 
     *          tags: [Student]
     *          responses:
     *              200:
     *                  description: The List Of All The Employees
     *                  
     */

    /**
     * @swagger
     * /student/getuser/{name}:
     *  get:
     *      summary: Get The Student By Name
     *      tags: [Student]
     *      parameters:
     *          - in: path
     *            name: name
     *            schema:
     *              type: string
     *            required: true
     *            description: The Student Name
     *      responses:
     *          200:
     *              description: The Stduent Name By Id
     *          404:
     *              description: Student Name Not Found
     */
    
    /**
     * @swagger
     * /student/usersignup:
     *   post:
     *      summary: It Will Create The New Student
     *      tags: [Student]
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
     * /student/usersignin:
     *   post:
     *      summary: user will signin
     *      tags: [Student]
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
     *              description: User SignedIn Successfully                        
     *        
     */

    /**
    * @swagger
     * /student/changepassword:
     *   put:
     *      security:
     *       - bearerAuth: []
     *      summary: It Will Change The Password
     *      tags: [Student]
     *      requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              newpassword:
     *                  type: string
     *                  example: "Mihir@123"
     *      responses:
     *          200:
     *              description: Password Changed Successfully                        
     *        
     */

     /**
    * @swagger
     * /student/forgotpassword:
     *   post:
     *      summary: It Will Forgot The Password
     *      tags: [Student]
     *      requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *            type: object
     *            properties:
     *              emailid:
     *                  type: string
     *                  example: "Mihir@gmail.com"
     *      responses:
     *          200:
     *              description: New Password Generated Successfully                        
     *        
     */