/**
 * Created by abayta on 17/08/16.
 */
Meteor.publish('daysOfDiet', function (dietId) {
    return Days.find({dietId: dietId});
});