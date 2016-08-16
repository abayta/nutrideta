/**
 * Created by abayta on 14/08/16.
 */
SearchSource.defineSource('dietsSource', function(searchText, options) {
    var options = {sort: {isoScore: -1}, limit: 20};

    if(searchText) {
        var regExp = buildRegExp(searchText);

        var selector = {$or: [
            {title: regExp},
            {description: regExp}
        ]};

        var diets = Diets.find(selector, options).fetch();

        return diets;
    }else{
        return Diets.find({},options).fetch();
    }
});


function buildRegExp(searchText) {
    // this is a dumb implementation
    var parts = searchText.trim().split(/[ \-\:]+/);
    return new RegExp("(" + parts.join('|') + ")", "ig");
}


