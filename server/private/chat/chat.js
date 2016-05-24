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
//Clientes online de un nutricionista
Meteor.publish('usersOnlineNutri', function(){
    if (Roles.userIsInRole(this.userId, ['paid', 'free'], 'nutricionist')) {
    var currentNutricionist = this.userId;
    return Meteor.users.find({$and: [{"status.online": true}, {nutricionistId: currentNutricionist}]}, {
        sort: {username: 1}
    });
    } else {
        this.stop();
        return;
    }
});

//Nutricionista online para el cliente
Meteor.publish('nutricionistOnline', function(){
    if (Roles.userIsInRole(this.userId, ['user'], 'user')) {
        var myself = Meteor.users.findOne(this.userId);
        var idNutri = myself.nutricionistId;
        return Meteor.users.find({$and: [{"status.online": true}, {_id: idNutri}]}, {
            sort: {username: 1}
        });
    } else {
        this.stop();
        return;
    }
});





