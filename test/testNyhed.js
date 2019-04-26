//her skal vi lave test af Nyheder for administrator

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');


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
