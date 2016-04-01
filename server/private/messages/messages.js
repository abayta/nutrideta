/**
 * Created by danjimgar on 14/03/2016.
 */

Meteor.publish('inbox', function(){
    var currentUser = this.userId;
    return Messages.find({ recipients: currentUser});
});