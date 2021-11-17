let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("../index");
let index = require("../index");

chai.should();
chai.use(chaiHttp);


describe("Tasks api", () => {
  /**
   * Testing Post API
   */
  describe("POST /api/tasks", () => {
    it("It Will Create New User", (done) => {
      const data = {
        name: "mihir",
        emailid: "mihir@gmail.com",
        password: "mihir",
      };

      chai
        .request(index)
        .post("/usersignup")
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.a("object");
          response.text.should.be.eq('{"message":"user created successfully"}');
          done();
        });
    });

    it("It Will get the user", (done) => {
      const data = {
        emailid: "mihir@gmail.com",
        password: "mihir",
      };

      chai
        .request(index)
        .post("/usersignin")
        .send(data)
        .end((err, response) => {
          response.should.have.status(200);
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
        .post("/usersignin")
        .send(data)
        .end((err, response) => {
          response.should.have.status(401);
          response.text.should.be.eq('"Please Enter Correct Password"');
          response.should.be.a("object");

          done();
        });
    });
  });

  describe("PUT /api/tasks", () => {

    it("it will call if the token is not passed", (done) => {
      chai
        .request(index)
        .put("/changepassword")
        .end((err, response) => {
          response.should.have.status(403);
          response.text.should.be.eq('{"message":"Access Denied! Unauthorized User"}');
        });
        done();
    });
  
    it("it will not verify the user beacuse token and emailid didn't matched", (done) => {
      const data = {
        emailid:"devdutt@gmail.com",
      }
      chai
        .request(index)
        .put("/changepassword")
        .set({                      // badrik's access token
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbGlkIjoiYmFkcmlrQGdtYWlsLmNvbSIsImlhdCI6MTYzNjcwODYyOSwiZXhwIjoxNjM2NzE1ODI5fQ.rhR_1wN7JLJAyPSANnuBMv_OD-MKHerV91ZU__qDuPY`
        })
        .send(data)
        .end((err,response) => {
          response.should.have.status(401);
          response.text.should.be.eq('{"message":"Entered Incorrect Emailid Or Incorrect Access Token"}');
        });
        done();
    });
  
    it("it will change the password because token and emailid is verified and old password is correct", (done) => {
      const data = {
        emailid:"devdutt@gmail.com",
        oldpassword:"mihir",
        newpassword:"devdutt"
      }
      chai
        .request(index)
        .put("/changepassword")
        .set({                      // devdutt's access token
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbGlkIjoiZGV2ZHV0dEBnbWFpbC5jb20iLCJpYXQiOjE2MzY3MTMxNTMsImV4cCI6MTYzNjcyMDM1M30.hxC0Zmtt7J3Sb6srZQvMYXQcTxJtyhl93U5OADn6wGw`
        })
        .send(data)
        .end((err,response) => {
          response.should.have.status(200);
          response.text.should.be.eq('{"message":"Password Changed Successfully"}');
        });
        done();
    });
  
    it("it will not change the password because token is verified but old password is incorrect", (done) => {
      const data = {
        emailid:"badrik@gmail.com",
        oldpassword:"badrik",
        newpassword:"vinay"
      }
      chai
        .request(index)
        .put("/changepassword")
        .set({                     
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbGlkIjoiYmFkcmlrQGdtYWlsLmNvbSIsImlhdCI6MTYzNjcxMzQ1NCwiZXhwIjoxNjM2NzIwNjU0fQ.FY0IjLZY5MzeGmUY--F-Pi8t6jfGq6MY7sYzJBwiR8U`
        })
        .send(data)
        .end((err,response) => {
          response.should.have.status(404);
          response.text.should.be.eq('{"message":"Entered Wrong Old Password"}');
        });
        done();
    });
  
  describe("DELETE /api/tasks", () => {

    it("It Will Delete The Data If token Is Verified ", (done) => {
      const data = {
        emailid : "anjali@gmail.com"
      }
      chai 
        .request(index)
        .delete("/deleteprofile")
        .set({
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbGlkIjoiYW5qYWxpQGdtYWlsLmNvbSIsImlhdCI6MTYzNjcxODU1NCwiZXhwIjoxNjM2NzI1NzU0fQ.unY4GgMJksA_satddWNgH0IhN8E27HGdlIEutwNm8C0`
        })
        .send(data)
        .end((err,response) => {
          response.text.should.be.eq('{"message":"User Deleted Succesfuuly"}');
        })
        done();
    });

   });
 
  });
});


