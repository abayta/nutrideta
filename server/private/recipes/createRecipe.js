SearchSource.defineSource('ingredientsSource', function(searchText, options) {
  var options = {sort: {isoScore: -1}, limit: 20};

  if(searchText) {
    var regExp = buildRegExp(searchText);

    var selector = {$or: [
      {name: regExp},
      {description: regExp}
    ]};

    var recps = Ingredients.find(selector, options).fetch();

    return recps;
  }else{
    return Ingredients.find({},options).fetch();
  }
});


function buildRegExp(searchText) {
  // this is a dumb implementation
  var parts = searchText.trim().split(/[ \-\:]+/);
  return new RegExp("(" + parts.join('|') + ")", "ig");
}
