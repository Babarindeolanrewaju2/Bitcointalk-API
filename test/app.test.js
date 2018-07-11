const request = require("supertest");
const app = require("../app");


const HallibitSignature = "<span style=\"color: blue;\"><span style=\"font-size: 12pt !important; line-height: 1.3em;\"><a class=\"ul\" href=\"https://cfinex.com\">CFINEX </a></span></span><a class=\"ul\" href=\"https://cfinex.com\"> CRYPTO EXCHANGE &nbsp; ★ HIGH AND LOW LIQUIDITY ALTCOINS ★ cfinex.com</a>";

describe("GET /users/:uid/signature ", ()=>{
    it("Should not return any error", (done)=>{
        request(app)
            .get("/users/106120/signature")
            .expect(200) 
            .expect((res)=>{
                expect(res.body.error).toBe(false);
            })
            .end(done);
    });

    it("Should return the current signature", (done)=>{
        request(app)
            .get("/users/106120/signature")
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.signature).toBe(HallibitSignature);
            }) 
            .end(done);
    });

});

describe("GET /users/:uid/level ", ()=>{
    it("Should not return any error", (done)=>{
        request(app)
            .get("/users/106120/level")
            .expect(200) 
            .expect((res)=>{
                expect(res.body.error).toBe(false);
            })
            .end(done);
    });

    it("Should return the current level", (done)=>{
        request(app)
            .get("/users/106120/level")
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.level).toBe("Legendary");
            }) 
            .end(done);
    });

});

describe("GET /users/:uid/posts/count ", ()=>{
    it("Should not return any error", (done)=>{
        request(app)
            .get("/users/106120/posts/count")
            .expect(200) 
            .expect((res)=>{
                expect(res.body.error).toBe(false);
            })
            .end(done);
    });

    it("Should return the posts count of today", (done)=>{
        request(app)
            .get("/users/106120/posts/count")
            .expect(200)
            .expect((res)=>{
                expect(res.body.data.count).toBeGreaterThanOrEqual(0);
            }) 
            .end(done);
    });

});