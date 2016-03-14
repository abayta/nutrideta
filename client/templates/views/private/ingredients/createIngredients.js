Template.listIngredients.onCreated(function() {
  this.autorun(() => {
    this.subscribe('ingredients');
  });
});

Template.listIngredients.helpers({
  ingredients: function(){
    return Ingredients.find();
  }
});
