const { expect } = require('chai');
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
});

describe('makeRefObj', () => {});

describe('formatComments', () => {});
