/**
 * Created by abayta on 11/08/16.
 */
Template.recipeItem.events({
   'click .bt-delete': function () {
       console.log('Aqui entra',this);
       Meteor.call('Recipes.methods.remove', {_id: this._id});
   }
});