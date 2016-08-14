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

// Template.searchResult.events({
//   "click .add-ingredient": function (event, template) {
//       document.getElementsByClassName('autoform-add-item')[0].click();
//       var lista = document.getElementsByClassName('list-group')[0].getElementsByTagName('li');
//       var last = lista[lista.length-2];
//       var inputN = last.getElementsByTagName('input');
//       inputN[0].value = this._id;
//       inputN[1].value = this.name;
//
//   }
// });

Template.searchBox.events({
  "keyup #search-box": _.throttle(function(e) {
    let text = $(e.target).val().trim();
    IngredientsSearch.search(text);
  }, 200)
});

Template.createRecipe.onCreated(function() {
  this.autorun(() => {
    this.subscribe('ingredients');
  });
});

AutoForm.addHooks('insertRecipeForm', {
  onSubmit: function (doc) {
    recipeSchemaForm.clean(doc);
    console.log("Recipe doc with auto values", doc);
    this.done();
    return false;
  },
  onSuccess: function(){
    console.log("El hook ha funcionado");
    swal({
      title: "¡Correcto!",
      text: "Una receta se ha añadida",
      timer: 2000,
      type: "success"
    });
  }
});
