//her skal vi lave test af

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

        login[0].username.should.not.be.equal('9');
        login[0].password.should.not.be.equal('#1');
    });
});

describe('News test', function () {

    it("TEST5 - test of correct headline/content test1", async function () {
        const response = await request(app)
            .get('/api/news')
            .expect(200)
            .expect('Content-Type', /json/);
        const news = response.body;

        news[0].headline.should.be.equal('test1');
        news[0].content.should.be.equal('test1');
    });

    it("TEST6 - test of incorrect headline/content test1", async function () {
        const response = await request(app)
            .get('/api/news')
            .expect(200)
            .expect('Content-Type', /json/);
        const news = response.body;

        news[0].headline.should.not.be.equal('test');
        news[0].content.should.not.be.equal('12345');
    });

    it("TEST7 - test of correct headline/content test2", async function () {
        const response = await request(app)
            .get('/api/news')
            .expect(200)
            .expect('Content-Type', /json/);
        const news = response.body;

        news[1].headline.should.be.equal('test2');
        news[1].content.should.be.equal('test2');
    });

    it("TEST8 - test of incorrect headline/content test2", async function () {
        const response = await request(app)
            .get('/api/news')
            .expect(200)
            .expect('Content-Type', /json/);
        const news = response.body;

        news[1].headline.should.not.be.equal('test');
        news[1].content.should.not.be.equal('12345');
    });
});
