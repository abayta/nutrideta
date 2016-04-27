var options = {
  keepHistory: 1000 * 60 * 5,
  localSearch: true
};
var fields = ['name', 'num'];

IngredientsSearch = new SearchSource('ingredientsSource', fields, options);

Template.searchResult.helpers({
  getIngredients: function() {
    return IngredientsSearch.getData();
  },
  isLoading: function() {
    return IngredientsSearch.getStatus().loading;
  }
});

Template.searchResult.rendered = function(){
  IngredientsSearch.search('');
};

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    let text = $(e.target).val().trim();
    IngredientsSearch.search(text);
  }, 200)
});
