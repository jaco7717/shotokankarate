//her skal vi lave test af Nyheder for administrator

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');
const fetch = require('node-fetch');
const newsModel = require('../models/News');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const controller = require("../controller/controller");
const assert = require('assert');

let data = {
    "headline": "Posttest headline",
    "content": "Posttest content"
}

let end;

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

    it('TEST9 - test of Post into News', function (done) {
        request(app)
            .post('/api/news')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done()
            });

    });



});

