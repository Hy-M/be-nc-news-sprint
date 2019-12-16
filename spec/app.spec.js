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
            it('status: 404 returns Path not found when given an invalid path', () => {
                return request(app)
                    .get('/api/topik')
                    .expect(404)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Path not found");
                    })
            });
            it('status: 405 returns Method not allowed', () => {
                const invalidMethods = ["put", "patch", "delete"];
                const methodPromises = invalidMethods.map((method) => {
                    return request(app)[method]('/api/topics')
                        .expect(405)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Method not allowed");
                        })
                });

                return Promise.all(methodPromises);
            });
        });
    });
});