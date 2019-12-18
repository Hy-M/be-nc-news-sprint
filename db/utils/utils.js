exports.formatDates = list => {
   let formattedDatesArr = list.map((article) => {
        let formattedDate = new Date(article.created_at);
        article.created_at = formattedDate;        
        return article;
    });
    return formattedDatesArr;
};

exports.makeRefObj = list => {
    let referenceObj = {};
    list.forEach((article) => {
        referenceObj[article.title] = article.article_id;
    })

    return referenceObj;
};

exports.formatComments = (comments, articleRef) => {

    let formattedComments = comments.map((comment) => {
        let newCommentObj = {...comment};
        newCommentObj.author = comment.created_by;
        delete newCommentObj.created_by;
        delete newCommentObj.belongs_to;
        newCommentObj.article_id = articleRef[comment.belongs_to];
        
        return newCommentObj;
    });

    return formattedComments;
};