/**
 * Created by abayta on 17/08/16.
 */
Meteor.publish('mealsOfDiet', function (dietId) {
    return Meals.find({dietId: dietId});
});