//her skal vi lave test af

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');

describe('test  - async', function () {

    it("test af password/username", async function () {
        const response = await request(app)
            //.get('https://shotokankarate.herokuapp.com/api/login')
            .get('/api/login')
            .expect(200)
            .expect('Content-Type', /json/);
        const login = response.body;

        login[0].username.should.be.equal('a');
        login[0].password.should.be.equal('a');
    });
});