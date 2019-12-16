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
  it('returns the date formatted correctly when passed a single date object in an array', () => {
    const articles = [{
      title: 'Seven inspirational thought leaders from Manchester UK',
      topic: 'mitch',
      author: 'rogersop',
      body: "Who are we kidding, there is only one, and it's Mitch!",
      created_at: '2013-11-28 23:09:11.761166+03',
    }];
    const formattedDate = new Date(articles[0].created_at);
    formatDates(articles);
    expect(articles[0].created_at).to.eql(formattedDate);
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
    formatDates(articles);
    expect(articles[0].created_at).to.eql(formattedDate);
    expect(articles[1].created_at).to.eql(formattedDate2);
  });
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});