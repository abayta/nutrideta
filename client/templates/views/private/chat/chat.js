/**
 * Created by Casa on 17/05/2016.
 */

Template.chat.helpers({
    'usersOnline': function () {
        var id = Meteor.userId();
        return Meteor.users.find({_id:  {$ne : id}});
    }
});