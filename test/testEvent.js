//Test af events på kalenderen

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');


let data = {
    "title": "Post test Calender title",
    "content": "Post test Calender content"
}

describe ('Event test', function () {

    it("TEST11 - Correct headline & content", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[0].title.should.be.equal('test');
        events[0].content.should.be.equal('test');
    });

    it("TEST12 - Incorrect headline & content", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[0].title.should.not.be.equal('1234');
        events[0].content.should.not.be.equal('4321');
    });


    it("TEST13 - Correct headline & content", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[1].title.should.be.equal('tjek');
        events[1].content.should.be.equal('tjek');
    });

    it("TEST14 - Incorrect headline & content", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[1].title.should.not.be.equal('testFejl');
        events[1].content.should.not.be.equal('1234');
    });

    it('TEST15 - test of Post into api/Calender', function (done) {
        request(app)
            .post('/api/calender')
            .send(data)
            .set('Accept', 'application/json')
            .expect('Content-Type', /text/)
            .expect(200)
            .then(response => {
                return response.json()
            })
            .then(object = response.last())
            .end((err) => {
                if (err) return done(err);
                done();
            });

    });

});