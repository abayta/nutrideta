/**
 * Created by Casa on 17/05/2016.
 */

/*
SyncedCron.add({
    name: 'Crunch some important numbers for the marketing department',
    schedule: function(parser) {
        // parser is a later.parse object
        return parser.text('every 1 minutes');
    },
    job: function() {
        console.log('Hey');
    }
});

Meteor.startup(function () {
    // code to run on server at startup
    SyncedCron.start();

});
*/

Meteor.publish('usersOnline', function(){
    return Meteor.users.find({ "status.online": true })
});


