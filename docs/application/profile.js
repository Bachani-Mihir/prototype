    /**
     * @swagger
     * /getprofile:
     *   get:
     *      security:
     *       - bearerAuth: []
     *      summary: It Will Get The Student
     *      tags: [Student]
     *      
     *      responses:
     *          200:
     *              description: It Will Get The Student                        
     *      
     */

    /**
     * @swagger
     * /editprofile:
     *   put:
     *      security:
     *       - bearerAuth: []
     *      summary: It Will Edit The Student
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
     *                  example: mihir
     *      responses:
     *          200:
     *              description: It Will Edit The Student                        
     *      
     */

    /**
     * @swagger
     * /deleteprofile:
     *   delete:
     *      security:
     *       - bearerAuth: []
     *      summary: It Will Delete The Student From The Database
     *      tags: [Student]
     *      responses:
     *          200:
     *              description: User Deleted Successfully                        
     *      
     */