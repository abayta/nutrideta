/**
 * Created by Casa on 17/05/2016.
 */

Template.chat.helpers({
    'usersOnline': function () {
        return Meteor.users.find({});
    }
});