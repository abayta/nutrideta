/**
 * Created by Casa on 03/05/2016.
 */

Meteor.publish('recipes', function () {
    return Recipes.find({author: this.userId});
});