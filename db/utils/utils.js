exports.formatDates = list => {
   let formattedDatesArr = list.map((article) => {
        let newArticleObj = {...article};  
        let formattedDate = new Date(newArticleObj.created_at); 
        newArticleObj.created_at = formattedDate;        
        return newArticleObj;
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