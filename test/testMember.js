//Test af medlemmer

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');

let data = {
    "name": "Post test name",
    "age": "1234",
    "email": "post@test.email",
    "password": "testPassword"
}



describe('Member test', function(){

    it("TEST16 - test 1 of correct name, age, email and password", async function (){
       const response = await request(app)
           .get('/api/member')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[0].name.should.be.equal('Medlem Test');
       members[0].age.should.be.equal('10');
       members[0].email.should.be.equal('medlem@test.dk');
       members[0].password.should.be.equal('password');
    });

    it("TEST17 - test 1 of incorrect name, age, email and password", async function(){
       const response = await request(app)
           .get('/api/member')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[0].name.should.not.be.equal('TESTmedlem');
       members[0].age.should.not.be.equal('34');
       members[0].email.should.not.be.equal('test@test.dk');
       members[0].password.should.not.be.equal('kodeord');

    });

    it("TEST18 - test 2 of correct name, age, email and password", async function(){
       const response = await request(app)
           .get('/api/member')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[1].name.should.be.equal('Medlem Test 2');
       members[1].age.should.be.equal('20');
       members[1].email.should.be.equal('test@medlem.com');
       members[1].password.should.be.equal('pass');
    });

    it("TEST19 - test 2 of incorrect name, age, email and password", async function(){
        const response = await request(app)
            .get('/api/member')
            .expect(200)
            .expect('Content-Type', /json/);

        const members = response.body;

        members[1].name.should.not.be.equal('test2');
        members[1].age.should.not.be.equal('45');
        members[1].email.should.not.be.equal('test2@test.dk');
        members[1].password.should.not.be.equal('passwordTest');
    });

    it("TEST20 - test of Post into api/members", function(done){
        request(app)
            .post('/api/member')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });
    });

})