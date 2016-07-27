AutoForm.addHooks('insertIngredientsForm', {
  onSuccess: function(){
    console.log("El hook ha funcionado")
    swal({
        title: "¡Correcto!",
        text: "Un ingrediente se ha añadido",
        timer: 2000,
        type: "success"
    });
  }
});

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
