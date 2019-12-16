process.env.NODE_ENV = 'test';

const {
    expect
} = require("chai");
const request = require("supertest");
const app = require("../app");

describe('/api', () => {
    describe('/topics', () => {
        describe('GET', () => {
            it('status: 200 returns an array of topics objects with keys of slug and description', () => {
                return request(app)
                    .get('/api/topics')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body[0]).to.contain.keys('slug', 'description');
                    })
            });
        });
    });
});