/**
 * Created by Dani on 03/02/2016.
 */

//Publicamos el perfil de un usuario
Meteor.publish('profile', function (id) {
    check(id, String);
    return Users.find(id);
});

//Publicamos las notes de un usuario
Meteor.publish('notesByUser', function(id) {
    return Notes.find({createdBy: id}, {sort: {createdAt: 1}, limit: 10});
});

Meteor.publish('recipes', function () {
    return Recipes.find({author: this.userId});
});

Meteor.publish("ingredients", function(){
    return Ingredients.find();
});