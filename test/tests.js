let chai = require("chai");
let chaiHttp = require("chai-http");
let index = require("../index");

chai.should();
chai.use(chaiHttp);


describe("Tasks api", () => {           
  /**
   * Testing Post API                           //  Student API TESTING 
   */   
  describe("POST /api/tasks", () => {
    
    it("It Will Create New User", (done) => {
      const data = {
        name: "kanu",
        emailid: "kanu@gmail.com",
        password: "kanu",
      };
      chai
        .request(index)
        .post("/student/usersignup")
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
        done();
        });
    });

    it("It Will Not Create New User Because User Already Exist", (done) => {
      const data = {
        name: "mihir",
        emailid: "mihir@gmail.com",
        password: "mihir",
      };
      chai
        .request(index)
        .post("/student/usersignup")
        .send(data)
        .end((err, response) => {
          response.should.have.status(402);
          response.should.be.a("object");
          response.text.should.be.eq('{"isSuccess":false,"message":"Multiple Users Cannot Be Created Using Same EmailId","status":402,"data":{}}');
          done();
        })
    })
  
    it("It Will get the user", (done) => {
      const data = {
        emailid: "mihir@gmail.com",
        password: "mihir",
      };
      chai
        .request(index)
        .post("/student/usersignin")
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          done();
        });
    });

    it("It Will not get the user", (done) => {
      const data = {
        emailid: "mihir@gmail.com",
        password: "vinay",
      };
      chai
        .request(index)
        .post("/student/usersignin")
        .send(data)
        .end((err, response) => {
          response.should.have.status(401);
          response.should.be.a("object");
          response.text.should.be.eq('{"isSuccess":false,"message":"Please Enter Correct Password","status":401,"data":{}}');
        });  
        done();
    });
  });

  describe("PUT /api/tasks", () => {

    it("it will Change The Password Because Token Is Verified", (done) => {
      const data = {
        newpassword: "mihir"
      };
      chai
        .request(index)
        .put("/student/changepassword")
        .set({              //Kunal's Authorization Token
          Authorization: `Bearer U2FsdGVkX18m768AdPPkAGk/Lkr+ifTVoBu6FjN6keZ6SFuHGTBL/47ynW2r/ak+txK43EHQ7yG68AVyRJqMD+UmoknoASVdSG0naINaXoH1HGykozCx/4Jv1zKzocNbmE4iWqC59M+6qYgRATzjDbUuY6KSP3G0o8e2MEgCCFpbmBDJTKFSSI3W+5wl/uF+zefJmHjIM66jU5dH4JUOCVDYx3xVrZHLxn1EfQX1FvChlTftV+KLpkPji2eXgcGH`
        })
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
        });
        done();
    });

  })
                                              // STUDENT'S PROFILE API TESTING  
  describe("GET /api/tasks", () => {

    it("It Will Get The User Profile Because Token Is Verified", (done) => {
      chai
        .request(index)
        .get("/getprofile")
        .set({                //Mihir's Authorization Token
          Authorization: `Bearer U2FsdGVkX18iMJ/LSilp4C2c1LXaAz989CM5qEpIhexqAkzkt5aq3uaDFlIyyvnjJvdBsMqGw+ATZVFuF2Sdc0mfAcwYH/DtVaqeYmAH8uMTDwI62hP3WkCEGWt7j9gYKrIesr16ELPb2NhXUQuwiPRuHGbRoNaIrWoczpXX7XXtQOZknbtbMnwEHDPWa/E4j9W28Owg0cFv0A2hSsUwCNItH+AWiF5eaV5vRHGjUDS+X6iKpI49IkUqfdLjB9DW`
        })
        .end((err,response) => {
          response.should.have.status(200);
          response.text.should.be.eq(`{"issuccess":true,"message":"Student's Data","status":"200","data":{"studentdata":{"_id":"6197325994f87d7ca13877f0","name":"mihir","emailid":"mihir@gmail.com","password":"$2a$10$ghmIgFp9oXlnTohRekRSQuJjZCivSgQPShqoz.gs03wDGeGg5AcIW","__v":0}}}`)
        })
        done();
    });

    it("It Will Edit The User Name Because Token Is verified", (done) => {
      const data = {
          name:"rahul"
      };
      chai
        .request(index)
        .put("/editprofile")
        .set({              //karan's Authorization Token
          Authorization: `Bearer U2FsdGVkX19FwJthDuJ6ex6JufqqzjZ9oyC9+92ansQjHXkEd+o27urOt0T5qlcC7cQwAvJ19c6ThlZdibUBF0Z/qxcJjs/FzYThrA9wXXHv+5Ps/TqsUjp0///D3RBAUWVqKQ9aAY/oO/qBaegNFo4cS+AQRdQf/30Jm/f2V9sMhZtONKnJxsptXpQCLnoYR5h3PtuVeBJAEwwWn0GMgBVjV3epMVD3581KrMSpSX/3WfkYQQNa4FNVU2EkTWij`
        })
        .send(data)
        .end((err,response) => {
          response.should.have.status(200);
          response.text.should.be.eq(`{"issuccess":true,"message":"Student's Updated Data","status":"200","data":{"getstd":{"_id":"6197327594f87d7ca13877f6","name":"rahul","emailid":"karan@gmail.com","password":"$2a$10$hLNFYDxe9YVhB9baORMIiecU57gDtmkCRvR7l6LW.lUriu6lI9XTq","__v":0}}}`)
        })
        done();
    })
  })

  describe("DELETE /api/tasks", () => {

      it("It Will Delete The Data If token Is Verified ", (done) => {
        chai 
          .request(index)
          .delete("/deleteprofile")
          .set({                //Vinay's Authorization Token
            Authorization: `Bearer U2FsdGVkX1/heLGxOCCcD45if+ZkSeLzGyU5UV8rzLHLip118Meitem3/POmsDsCGTk9tTM9EROBV4dUeVGANTosnLyRxnRkRwME/haEEd3/0N9M9AYmuBKleQvLUZ22spcwxSwe1Ke2/y+8FM8rk7JEG4/AeT0PSo+8oN/fJDdtamChW/uTHhfhYI6xRGNZE95ss3jddqDHMAHIQrYiCfak/2h6lOvqGrO40+99SzF3CM9wfuMXi+yujqOxM5rb`
          })
          .end((err,response) => {
            response.should.have.status(200);
            response.text.should.be.eq('{"issuccess":true,"message":"User Deleted Successfully","status":"200","data":{"flag":true}}')
          })
          done();
      });
  })
  
});

