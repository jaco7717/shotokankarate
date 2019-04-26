//her skal vi lave test af administrator login

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');

describe('Login test', function () {

    it("TEST1 - test of correct password/username a/a", async function () {
        const response = await request(app)
            .get('/api/login')
            .expect(200)
            .expect('Content-Type', /json/);
        const login = response.body;

        login[0].username.should.be.equal('a');
        login[0].password.should.be.equal('a');
    });

    it("TEST2 - test of incorrect password/username a/a", async function () {
        const response = await request(app)
            .get('/api/login')
            .expect(200)
            .expect('Content-Type', /json/);
        const login = response.body;

        login[0].username.should.not.be.equal('c');
        login[0].password.should.not.be.equal('y');
    });
    it("TEST3 - test of correct password/username b/b", async function () {
        const response = await request(app)
            .get('/api/login')
            .expect(200)
            .expect('Content-Type', /json/);
        const login = response.body;

        login[1].username.should.be.equal('b');
        login[1].password.should.be.equal('b');
    });

    it("TEST4 - test of incorrect password/username b/b", async function () {
        const response = await request(app)
            .get('/api/login')
            .expect(200)
            .expect('Content-Type', /json/);
        const login = response.body;

        login[1].username.should.not.be.equal('9');
        login[1].password.should.not.be.equal('#1');
    });
});
