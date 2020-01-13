const knex = require("../db/connection");

exports.fetchTopics = () => {
    return knex
    .select("*")
    .from("topics");
}

exports.checkTopicExists = ({topic}) => {
    return knex
    .select('*')
    .from('topics')
    .modify((query) => {
        if (topic) query.where('slug', topic);
    })
    .then((topic) => {
        if (!topic.length) {
            return Promise.reject({status: 404, msg: "Topic not found"})
        }
    })
};