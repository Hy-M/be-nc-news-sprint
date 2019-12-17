process.env.NODE_ENV = 'test';

const chai = require("chai");
const {
    expect
} = chai;
const request = require("supertest");
const app = require("../app");
const chaiSorted = require("chai-sorted");
const connection = require("../db/connection");
chai.use(chaiSorted);

beforeEach(() => connection.seed.run());
after(() => connection.destroy());

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
    describe('/users', () => {
        describe('/:username', () => {
            describe('GET', () => {
                it('status: 200 returns an array of user objects with keys of username, avatar_url and name', () => {
                    return request(app)
                        .get('/api/users/butter_bridge')
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body[0]).to.contain.keys('username', 'avatar_url', 'name');
                        })
                });
                it('status: 404 returns Path not found when given a non-existant username', () => {
                    return request(app)
                        .get('/api/users/humayraa')
                        .expect(404)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Path not found");
                        })
                });
                it('status: 400 returns Bad request when given an invalid username', () => {
                    return request(app)
                        .get('/api/users/20')
                        .expect(400)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Bad request");
                        })
                });
                it('status: 405 returns Method not allowed', () => {
                    const invalidMethods = ["put", "patch", "delete"];
                    const methodPromises = invalidMethods.map((method) => {
                        return request(app)[method]('/api/users/butter_bridge')
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
    describe('/articles', () => {
        describe('/:article_id', () => {
            describe('GET', () => {
                it.only('status: 200 returns one article object with the comment_count', () => {
                    return request(app)
                        .get('/api/articles/3')
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body[0]).to.contain.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
                            expect(body[0].comment_count).to.equal(0);
                            expect(body.length).to.equal(1);
                        })
                });
            });
        });
    });
});