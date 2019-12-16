exports.formatDates = list => {
    if (!list.length) return [];
   let formattedDatesArr = list.map((article) => {
        let formattedDate = new Date(article.created_at);
        article.created_at = formattedDate;
        return article;
    });
    return formattedDatesArr;
};

exports.makeRefObj = list => {};

exports.formatComments = (comments, articleRef) => {};