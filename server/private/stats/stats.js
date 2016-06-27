/**
 * Created by a618052 on 27/06/2016.
 */

Meteor.publish('statsByClient', function(id) {
    return Stats.find({createdBy: id}, {sort: {createdAt: 1}});
});
