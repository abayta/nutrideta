Template.listRecipes.onCreated(function() {
    this.autorun(() => {
        this.subscribe('recipes');
    });
});

Template.listRecipes.helpers({
    recipes: function () {
        return Recipes.find();
    }
});
