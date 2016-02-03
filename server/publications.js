/**
 * Created by Dani on 03/02/2016.
 */

Meteor.publish('profile', function (id) {
    check(id, String);
    return Users.find(id);
});
