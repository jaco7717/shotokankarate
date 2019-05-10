//Test af oprettelse af medlemmer

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

    it("TEST# - test 1 of correct name, age, email and password", async function (){
       const response = await request(app)
           .get('/api/members')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[0].name.should.be.equal('Mads');
       members[0].age.should.be.equal('24');
       members[0].email.should.be.equal('mads@test.dk');
       members[0].password.should.be.equal('randers4ever');
    });

    it("TEST# +1 - test 1 of incorrect name, age, email and password", async function(){
       const response = await request(app)
           .get('/api/members')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[0].name.should.not.be.equal('TESTmedlem');
       members[0].age.should.not.be.equal('34');
       members[0].email.should.not.be.equal('test@test.dk');
       members[0].password.should.not.be.equal('password');

    });

    it("TEST# +2 - test 2 of correct name, age, email and password", async function(){
       const response = await request(app)
           .get('/api/members')
           .expect(200)
           .expect('Content-Type', /json/);

       const members = response.body;

       members[1].name.should.be.equal('Tomas');
       members[1].age.should.be.equal('23');
       members[1].email.should.be.equal('Tomas@karate.com');
       members[1].password.should.be.equal('1234');
    });

    it("TEST# +3 - test 2 of incorrect name, age, email and password", async function(){
        const response = await request(app)
            .get('/api/members')
            .expect(200)
            .expect('Content-Type', /json/);

        const members = response.body;

        members[1].name.should.not.be.equal('test2');
        members[1].age.should.not.be.equal('45');
        members[1].email.should.not.be.equal('test2@test.dk');
        members[1].password.should.not.be.equal('passwordTest');
    });

    it("TEST# +4 - test of Post into api/members", function(done){
        request(app)
            .post('/api/members')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .then(response => {
                return response.json()
            })
            .then(object = response.last())
            .end((err) =>{
                if (err) return done(err);
                done();
            });
    });

})