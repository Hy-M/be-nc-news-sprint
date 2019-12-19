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


beforeEach(function() {
    this.timeout(10000);
    return connection.seed.run();
  });

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
                        .get('/api/articles/2')
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
                            inc_votes: 100
                        })
                        .expect(200)
                        .then(({
                            body
                        }) => {
                            expect(body).to.have.key('article');
                            expect(body.article[0].votes).to.equal(100);
                        })
                });
                it('status: 404 returns Path not found for a non-existant article_id', () => {
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
                            expect(body.article[0].votes).to.equal(0);
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
                            expect(body.article[0].votes).to.equal(1);
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
                                expect(body.comment[0]).to.contain.keys('author', 'body', 'comment_id', 'article_id', 'votes', 'created_at');
                                expect(body.comment[0].author).to.equal('lurker');
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
                                expect(comment[0].votes).to.equal(0)
                            })
                    });
                });
                describe('GET', () => {
                    it('status: 200 returns the comments with default sorting and ordering', () => {
                        return request(app)
                            .get('/api/articles/1/comments')
                            .expect(200)
                            .then(({
                                body
                            }) => {
                                expect(body).to.have.key('comments');
                                expect(body.comments[0]).to.contain.keys('comment_id', 'votes', 'created_at', 'author', 'body');

                                const sortedColumn = body.comments.map((comment) => {
                                    return comment.created_at;
                                })
                                expect(sortedColumn).to.be.ascending;
                            })
                    });
                    it('status: 200 returns the comments with given sorting and default ordering', () => {
                        return request(app)
                            .get('/api/articles/1/comments?sort_by=votes')
                            .expect(200)
                            .then(({
                                body
                            }) => {
                                const sortedColumn = body.comments.map((comment) => {
                                    return comment.votes;
                                })
                                expect(sortedColumn).to.be.ascending;
                            })
                    });
                    it('status: 200 returns the comments with given sorting and given ordering', () => {
                        return request(app)
                            .get('/api/articles/1/comments?sort_by=author&&order=desc')
                            .expect(200)
                            .then(({
                                body
                            }) => {
                                const sortedColumn = body.comments.map((comment) => {
                                    return comment.author;
                                })
                                expect(sortedColumn).to.be.descending;
                            })
                    });
                    it('status: 200 returns the comments with the default sorting and given ordering', () => {
                        return request(app)
                            .get('/api/articles/1/comments?order=desc')
                            .expect(200)
                            .then(({
                                body
                            }) => {
                                const sortedColumn = body.comments.map((comment) => {
                                    return comment.created_at;
                                })
                                expect(sortedColumn).to.be.descending;
                            })
                    });
                    it('status: 404 returns Path not found when no comments exist for the article', () => {
                        return request(app)
                            .get('/api/articles/2/comments')
                            .expect(404)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Path not found");
                            })
                    });
                    it('status: 404 returns Path not found when a non-existant path is given', () => {
                        return request(app)
                            .get('/api/articles/299034/comments')
                            .expect(404)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Path not found");
                            })
                    });
                    it('status: 400 returns Bad request when an invalid sort_by value is given', () => {
                        return request(app)
                            .get('/api/articles/3/comments?sort_by=dogs')
                            .expect(400)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Bad request");
                            })
                    });
                    it('status: 400 returns Bad request when an invalid order_by value is given', () => {
                        return request(app)
                            .get('/api/articles/3/comments?order=dogs')
                            .expect(400)
                            .then(({
                                body: {
                                    msg
                                }
                            }) => {
                                expect(msg).to.equal("Bad request");
                            })
                    });
                });
            });
        });
        describe('GET', () => {
            it('status: 200 returns an articles array of objects with the correct keys, and default sort_by and order_by', () => {
                return request(app)
                    .get('/api/articles')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body).to.have.key('articles');
                        expect(body.articles).to.be.an('array');
                        expect(body.articles[0]).to.contain.keys('author', 'title', 'article_id', 'topic', 'created_at', 'votes', 'comment_count');
                        const sortedColumn = body.articles.map((article) => {
                            return article.created_at;
                        });
                        expect(sortedColumn).to.be.descending;
                    })
            })
            it('status: 200 returns an articles array of objects sorted by the given query', () => {
                return request(app)
                    .get('/api/articles?sort_by=votes')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        const sortedColumn = body.articles.map((article) => {
                            return article.votes;
                        });
                        expect(sortedColumn).to.be.descending;
                    })
            });
            it('status: 200 returns an articles array of objects ordered by the given query', () => {
                return request(app)
                    .get('/api/articles?order=asc')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        const sortedColumn = body.articles.map((article) => {
                            return article.created_at;
                        });
                        expect(sortedColumn).to.be.ascending;
                    })
            });
            it('status: 200 returns an articles array of objects sorted and ordered by the given queries', () => {
                return request(app)
                    .get('/api/articles?sort_by=votes&&order=asc')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        const sortedColumn = body.articles.map((article) => {
                            return article.votes;
                        });
                        expect(sortedColumn).to.be.ascending;
                    })
            });
            it('status: 200 returns an articles array of objects filtered by the author query', () => {
                return request(app)
                    .get('/api/articles?author=icellusedkars')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        const authorColumns = body.articles.every((article) => {
                            return article.author === "icellusedkars"
                        });
                        expect(authorColumns).to.be.true;
                    })
            });
            it('status: 200 returns an articles array of objects filtered by the topic query', () => {
                return request(app)
                    .get('/api/articles?topic=mitch')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        const topicColumns = body.articles.every((article) => {
                            return article.topic === "mitch"
                        });
                        expect(topicColumns).to.be.true;
                    })
            });
            it('status: 400 returns Bad request when given an invalid sort_by value', () => {
                return request(app)
                    .get('/api/articles?sort_by=monkeys')
                    .expect(400)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Bad request");
                    })
            });
            it('status: 400 returns Bad request when given an invalid order_by value', () => {
                return request(app)
                    .get('/api/articles?order=big')
                    .expect(400)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Bad request");
                    })
            });
            it('status: 404 returns Path not found when given a non-existant author query', () => {
                return request(app)
                    .get('/api/articles?author=humayraa')
                    .expect(404)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Path not found");
                    })
            });
            it('status: 404 returns Path not found when given a non-existant topic query', () => {
                return request(app)
                    .get('/api/articles?topic=mushrooms')
                    .expect(404)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Path not found");
                    })
            });
            it('status: 200 returns an empty array when given a valid author query that results in no articles', () => {
                return request(app)
                    .get('/api/articles?author=lurker')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body.articles).to.eql([]);
                    })
            });
            it('status: 200 returns an empty array when given a valid topic query that results in no articles', () => {
                return request(app)
                    .get('/api/articles?topic=paper')
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body.articles).to.eql([]);
                    })
            });
        });
    });
    describe('/comments/:comment_id', () => {
        describe('PATCH', () => {
            it('status: 200 returns an updated comment object when incrementing votes', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: 1
                    })
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body).to.have.key('comment');
                        expect(body.comment).to.contain.key('comment_id');
                        expect(body.comment.votes).to.equal(17)
                    })
            });
            it('status: 200 returns an updated comment object when decrementing votes', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: -3
                    })
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body).to.have.key('comment');
                        expect(body.comment).to.contain.key('comment_id');
                        expect(body.comment.votes).to.equal(13)
                    })
            });
            it('status: 404 returns Path not found for a non-existant comment_id', () => {
                return request(app)
                    .patch('/api/comments/923923')
                    .expect(404)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Path not found");
                    })
            });
            it('status: 200 returns the comment object unchanged when an empty object is passed on request body', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({})
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body).to.have.key('comment');
                        expect(body.comment.votes).to.equal(16);
                    })
            });
            it('status: 400 returns Bad request when inc_votes is not passed an integer', () => {
                return request(app)
                    .patch('/api/comments/1')
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
            it('status: 400 returns Bad request when given an invalid comment_id', () => {
                return request(app)
                    .patch('/api/comments/one')
                    .send({
                        inc_votes: 1
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
            it('status: 200 returns a comment object with updated votes and ignores the second property passed to the request body', () => {
                return request(app)
                    .patch('/api/comments/1')
                    .send({
                        inc_votes: 1,
                        name: 'Mitch'
                    })
                    .expect(200)
                    .then(({
                        body
                    }) => {
                        expect(body.comment.votes).to.equal(17);
                    })
            });
            it('status: 405 returns Method not allowed', () => {
                const invalidMethods = ['post', 'get'];
                const methodPromises = invalidMethods.map((method) => {
                    return request(app)[method]('/api/comments/1')
                        .expect(405)
                        .then(({
                            body: {
                                msg
                            }
                        }) => {
                            expect(msg).to.equal('Method not allowed');
                        })
                })

            });
        });
        describe('DELETE', () => {
            it('status: 204 returns no content on response body', () => {
                return request(app)
                    .delete('/api/comments/1')
                    .expect(204)
                    .then(({
                        body
                    }) => {
                        expect(body).to.eql({});
                    })
            });
            it('status: 404 returns Path not found when given a non-existant comment_id', () => {
                return request(app)
                    .delete('/api/comments/25693')
                    .expect(404)
                    .then(({
                        body: {
                            msg
                        }
                    }) => {
                        expect(msg).to.equal("Path not found");
                    })
            });
            it('status: 400 returns Bad request when given an invalid comment_id', () => {
                return request(app)
                    .delete('/api/comments/one')
                    .send({
                        inc_votes: 1
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
        });
    });
});