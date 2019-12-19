const {
  expect
} = require('chai');
const {
  formatDates,
  makeRefObj,
  formatComments,
} = require('../db/utils/utils');

describe('formatDates', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(formatDates([])).to.eql([]);
  });
  it('returns the date formatted correctly when passed a single object in an array', () => {
    const articles = [{
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2013-11-28 23:09:11.761166+03',
    }];
    const formattedDate = new Date(articles[0].created_at);
    const result = formatDates(articles);
    expect(result[0].created_at).to.eql(formattedDate);
  });
  it('checks that the created_at key is an instance of Date', () => {
    const articles = [{
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2013-11-28 23:09:11.761166+03',
    }];
    const formattedDate = new Date(articles[0].created_at);
    const formattedDatesArr = formatDates(articles);
    expect(formattedDatesArr[0].created_at).to.be.an.instanceOf(Date);
  });
  it('checks that the original passed in array has a different reference to the returned array', () => {
    const articles = [{
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2013-11-28 23:09:11.761166+03',
    }];
    const formattedDatesArr = formatDates(articles);
    expect(formattedDatesArr).to.not.equal(articles);
  });
  it('checks that the original passed in objects have a different reference to the returned objects', () => {
    const articles = [{
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2013-11-28 23:09:11.761166+03',
    }];
    const result = formatDates(articles);
    expect(result[0]).to.not.equal(articles[0]);
  });
  it('returns the date formatted correctly when passed multiple date objects in an array', () => {
    const articles = [{
        title: 'Seven inspirational thought leaders from Manchester UK',
        topic: 'mitch',
        author: 'rogersop',
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: '2013-11-28 23:09:11.761166+03',
      }, {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171,
      },
      {
        title: 'Eight pug gifs that remind me of mitch',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'some gifs',
        created_at: 1289996514171,
      }
    ];
    const formattedDate = new Date(articles[0].created_at);
    const formattedDate2 = new Date(articles[1].created_at);
    const result = formatDates(articles);
    expect(result[0].created_at).to.eql(formattedDate);
    expect(result[1].created_at).to.eql(formattedDate2);
  });
});

describe('makeRefObj', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(makeRefObj([])).to.eql({});
  });
  it('returns an object with a key of the article title, and value of the article id when passed a single object in an array', () => {
    const articles = [{
      article_id: 1,
      title: 'Am I a cat?',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
      created_at: 280844514171,
    }];
    const referenceObj = {
      "Am I a cat?": 1
    };
    const makingRefObj = makeRefObj(articles);
    expect(makingRefObj).to.eql(referenceObj);
  });
  it('returns an object with keys of the article titles, and values of the article id\'s when passed multiple objects in an array', () => {
    const articles = [{
        article_id: 1,
        title: 'Am I a cat?',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
        created_at: 280844514171,
      },
      {
        article_id: 2,
        title: 'Moustache',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'Have you seen the size of that thing?',
        created_at: 154700514171,
      },
      {
        article_id: 3,
        title: 'Seven inspirational thought leaders from Manchester UK',
        topic: 'mitch',
        author: 'rogersop',
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171,
      }
    ];
    const referenceObj = {
      "Am I a cat?": 1,
      'Moustache': 2,
      'Seven inspirational thought leaders from Manchester UK': 3
    };
    const makingRefObj = makeRefObj(articles);
    expect(makingRefObj).to.eql(referenceObj);
  });
  it('checks that the original article objects are not mutated', () => {
    const articles = [{
        article_id: 1,
        title: 'Am I a cat?',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
        created_at: 280844514171,
      },
      {
        article_id: 2,
        title: 'Moustache',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'Have you seen the size of that thing?',
        created_at: 154700514171,
      },
      {
        article_id: 3,
        title: 'Seven inspirational thought leaders from Manchester UK',
        topic: 'mitch',
        author: 'rogersop',
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171,
      }
    ];
    const referenceObj = {
      "Am I a cat?": 1,
      'Moustache': 2,
      'Seven inspirational thought leaders from Manchester UK': 3
    };
    const makingRefObj = makeRefObj(articles);
    expect(articles[0]).to.eql({
      article_id: 1,
      title: 'Am I a cat?',
      topic: 'mitch',
      author: 'icellusedkars',
      body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
      created_at: 280844514171,
    });
  });
});

describe('formatComments', () => {
  it('returns a new array of a comment object with a key of author, and no key of created_by when passed one object', () => {
    const comments = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      belongs_to: 'Sunday league football',
      created_by: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733,
    }]
    const articles = [{
      article_id: 1,
      title: 'Sunday league football',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: 406988514171,
    }];
    const result = [{
      body: 'Iure cum non veritatis dolore corrupti deserunt perferendis molestiae. Voluptatem ullam qui aut voluptatem. Magnam quo ut rem nobis quibusdam. Assumenda ex laboriosam ut ea explicabo.',
      article_id: 1,
      author: 'happyamy2016',
      votes: 2,
      created_at: 1501187675733
    }]
    const referenceObjArr = makeRefObj(articles);
    expect(formatComments(comments, referenceObjArr)).to.eql(result);
  });
  it('returns a new array of a comment object with a key of article_id, and no key of belongs_to when passed one object', () => {
    const comments = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "Seven inspirational thought leaders from Manchester UK",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }];
    const articles = [{
      article_id: 1,
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: 406988514171,
    }];
    const referenceObjArr = makeRefObj(articles);
    expect(formatComments(comments, referenceObjArr)[0]).to.include.key('article_id');
    expect(formatComments(comments, referenceObjArr)[0]).to.not.include.key('belongs_to');
  });
  it('returns a new array of a comment object with the value of created_at converted to an instance of Date', () => {
    const comments = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "They're not exactly dogs, are they?",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }];
    const articles = [{
      article_id: 1,
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: 406988514171,
    }];
    const referenceObjArr = makeRefObj(articles);
    const formattedDatesInComments = formatDates(comments);
    const formattedComments = formatComments(formattedDatesInComments, referenceObjArr);
    expect(formattedComments[0].created_at).to.be.an.instanceOf(Date);
  });
  it('returns a new array of a comment object with the value of article_id set to a number', () => {
    const comments = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      belongs_to: "Seven inspirational thought leaders from Manchester UK",
      created_by: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }];
    const articles = [{
      article_id: 1,
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: 406988514171,
    }];

    const referenceObjArr = makeRefObj(articles);

    const result = [{
      body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
      article_id: 1,
      author: 'butter_bridge',
      votes: 16,
      created_at: 1511354163389
    }];

    expect(formatComments(comments, referenceObjArr)).to.eql(result);
  });
  it('checks that the returned array of objects all contain the correct keys', () => {
    const comments = [{
        body: "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "Seven inspirational thought leaders from Manchester UK",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389
      },
      {
        body: 'I hate streaming eyes even more',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 0,
        created_at: 1353674163389,
      },
      {
        body: 'This morning, I showered for nine minutes.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 975242163389,
      }
    ];
    const articles = [{
        article_id: 1,
        title: 'Seven inspirational thought leaders from Manchester UK',
        topic: 'mitch',
        author: 'rogersop',
        body: "Who are we kidding, there is only one, and it's Mitch!",
        created_at: 406988514171,
      },
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
      {
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      }
    ];

    const referenceObjArr = makeRefObj(articles)
    expect(formatComments(comments, referenceObjArr)[0]).to.contain.keys('author', 'article_id', 'votes', 'body', 'created_at');
    expect(formatComments(comments, referenceObjArr)[1]).to.contain.keys('author', 'article_id', 'votes', 'body', 'created_at');
  });
});