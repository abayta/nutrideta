/**
 * Created by abayta on 16/08/16.
 */
Meteor.publish('diets', function () {
    return Diets.find({author: this.userId});
});

Meteor.publish('oneDiet', function (id) {
    check(id, String);
    return Diets.find({_id:id});
});