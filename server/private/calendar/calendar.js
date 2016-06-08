/**
 * Created by a618052 on 08/06/2016.
 */

Meteor.publish('calendar', function () {
    var currentUser = this.userId;
    return Dates.find({owner: currentUser}, {sort: {createdAt: 1}});
});