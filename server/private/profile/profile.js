/**
 * Created by Casa on 09/03/2016.
 */

Meteor.publish('user', function(){
    var currentUser = this.userId;
    return Meteor.users.find({ _id: currentUser});
});