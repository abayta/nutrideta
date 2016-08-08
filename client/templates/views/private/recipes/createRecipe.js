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

Template.searchResult.events({
  "click .add-ingredient": function (event, template) {
      console.log(this);
      document.getElementsByClassName('autoform-add-item')[0].click();
      var lista = document.getElementsByClassName('list-group')[0].getElementsByTagName('li');
      var last = lista[lista.length-2];
      var inputN = last.getElementsByClassName('form-control');
      inputN[0].value = this._id;
      inputN[1].value = this.name;
      console.log(last);

  }
});

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    let text = $(e.target).val().trim();
    IngredientsSearch.search(text);
  }, 200)
});

AutoForm.addHooks(['insertRecipeForm'], {
    onSuccess: function(formType, result) {
        $('select').each(function() { //Select2 doesnt clear on its own
            $(this).select2('val', '');
        });
    }
})

