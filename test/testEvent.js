//Test af events på kalenderen

const app = require('../karate.js');
const request = require('supertest');
const should = require('should');


let data = {
    "title": "Post test Calender title",
    "content": "Post test Calender content",
    "date": Date.now(),
    "className": "Post test Calender className",
    "allDay": false
}

describe ('Event test', function () {

    it("TEST11 - Correct title, content, date, className & allDay", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[0].title.should.be.equal('test');
        events[0].content.should.be.equal('test');
        events[0].date.should.be.equal("2019-05-06T08:00:00.000Z");
        events[0].className.should.be.equal('info');
        events[0].allDay.should.be.equal(false);
    });

    it("TEST12 - Incorrect title, content, date, className & allDay", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[0].title.should.not.be.equal('1234');
        events[0].content.should.not.be.equal('4321');
        events[0].date.should.not.be.equal("2020-05-06T08:00:00.000Z");
        events[0].className.should.not.be.equal('test1234');
        events[0].allDay.should.not.be.equal(true);
    });


    it("TEST13 - Correct title, content, date, className & allDay", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[1].title.should.be.equal('tjek');
        events[1].content.should.be.equal('tjek');
        events[1].date.should.be.equal("2019-05-06T10:00:00.000Z");
        events[1].className.should.be.equal('info');
        events[1].allDay.should.be.equal(false);
    });

    it("TEST14 - Incorrect title, content, date, className & allDay", async function () {
        const response = await request(app)
            .get('/api/calender')
            .expect(200)
            .expect('Content-Type', /json/);
        const events = response.body;

        events[1].title.should.not.be.equal('testFejl');
        events[1].content.should.not.be.equal('1234');
        events[1].date.should.not.be.equal("2020-05-06T10:00:00.000Z");
        events[1].className.should.not.be.equal('test1234');
        events[1].allDay.should.not.be.equal(true);
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