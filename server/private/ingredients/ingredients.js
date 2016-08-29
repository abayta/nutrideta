/**
 * Created by Casa on 03/05/2016.
 */

Meteor.publish("ingredients", function(){
    return Ingredients.find();
});

Meteor.publish('ingredientsOfRecipe', function (id) {
    check(id, String);
    return Ingredients.find({_id:id});
});