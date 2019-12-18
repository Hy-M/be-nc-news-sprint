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
                        expect(body).to.have.key('topics');
                        expect(body.topics[0]).to.contain.keys('slug', 'description');
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
                it('status: 200 returns one user object with keys of username, avatar_url and name', () => {
                    return request(app)
                        .get('/api/users/butter_bridge')
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body).to.have.key('user');
                            expect(body.user).to.contain.keys('username', 'avatar_url', 'name');
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
                it('status: 200 returns one article object with the comment_count', () => {
                    return request(app)
                        .get('/api/articles/3')
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body).to.have.key('article');
                            expect(body.article).to.contain.keys('author', 'title', 'article_id', 'body', 'topic', 'created_at', 'votes', 'comment_count');
                            expect(body.article.comment_count).to.equal(0);
                        })
                });
                it('status: 404 returns Path not found', () => {
                    return request(app)
                        .get('/api/articles/309284')
                        .expect(404)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Path not found");
                        })
                });
                it('status: 400 returns Bad Request', () => {
                    return request(app)
                        .get('/api/articles/three')
                        .expect(400)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal('Bad request');
                        })
                });
                it('status: 405 returns Method not allowed', () => {
                    const invalidMethods = ['post', 'delete'];
                    const methodPromises = invalidMethods.map((method) => {
                        return request(app)[method]('/api/articles/3')
                            .expect(405)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Method not allowed");
                            })
                    })
                    return Promise.all(methodPromises);
                });
            });
            describe('PATCH', () => {
                it('status: 200 returns the article object with updated votes', () => {
                    return request(app)
                        .patch('/api/articles/3')
                        .send({
                            inc_votes: 1
                        })
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body).to.have.key('article');
                            expect(body.article.votes).to.equal(1);
                        })
                });
                it('status: 404 returns Path not found', () => {
                    return request(app)
                        .patch('/api/articles/35656')
                        .expect(404)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Path not found");
                        })
                });
                it('status: 200 returns the article object unchanged when an empty object is passed on request body', () => {
                    return request(app)
                        .patch('/api/articles/3')
                        .send({})
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body).to.have.key('article');
                            expect(body.article.votes).to.equal(0);
                        })
                });
                it('status: 400 returns Bad request when inc_votes is not passed an integer', () => {
                    return request(app)
                        .patch('/api/articles/3')
                        .send({
                            inc_votes: "cats"
                        })
                        .expect(400)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal("Bad request");
                        })
                });
                it('status: 200 returns the article object with updated votes and ignores the second property passed to the request body', () => {
                    return request(app)
                        .patch('/api/articles/3')
                        .send({
                            inc_votes: 1,
                            name: 'Mitch'
                        })
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body.article.votes).to.equal(1);
                        })
                });
            });
            describe('/comments', () => {
                describe('POST', () => {
                    it('status: 201 returns an object of the posted comment', () => {
                        return request(app)
                            .post('/api/articles/3/comments')
                            .send({
                                username: "lurker",
                                body: "Cool!"
                            })
                            .expect(201)
                            .then(({
                                body
                            }) => {
                                expect(body).to.have.key('comment');
                                expect(body.comment).to.contain.keys('author', 'body', 'comment_id', 'article_id', 'votes', 'created_at');
                                expect(body.comment.author).to.equal('lurker');
                            })
                    });
                    it('status: 404 returns Path not found for a non-existant article_id', () => {
                        return request(app)
                            .post('/api/articles/935794/comments')
                            .send({
                                username: "lurker",
                                body: "Cool!"
                            })
                            .expect(404)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Path not found");
                            })
                    })
                    it('status: 404 returns Path not found for a mispelled endpoint', () => {
                        return request(app)
                            .post('/api/articles/3/commentz')
                            .send({
                                username: "lurker",
                                body: "Cool!"
                            })
                            .expect(404)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Path not found");
                            })
                    })
                    it('status: 400 returns Bad request when given an invalid article_id', () => {
                        return request(app)
                            .post('/api/articles/three/comments')
                            .send({
                                username: "lurker",
                                body: "Cool!"
                            })
                            .expect(400)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Bad request");
                            })
                    });
                    it('status: 201 returns an object of the posted comment and ignores extra properties on the req body', () => {
                        return request(app)
                            .post('/api/articles/3/comments')
                            .send({
                                username: 'lurker',
                                body: 'lalala',
                                votes: 36
                            })
                            .expect(201)
                            .then(({
                                body: {
                                    comment
                                }
                            }) => {
                                expect(comment.votes).to.equal(0)
                            })
                    });
                });
            });
        });
    });
});