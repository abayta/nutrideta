/**
 * Created by Casa on 12/05/2016.
 */

//Publicamos los usuarios a los que se le pueden enviar mensajes
Meteor.publish('usersAvailableMessage', function () {
    var currentUser = this.userId;
    var nutri = Meteor.users.findOne(currentUser);
    if (Roles.userIsInRole(currentUser, ['user'], 'user')) {
        return Meteor.users.find({_id: nutri.nutricionistId});
    } else if (Roles.userIsInRole(currentUser, ['paid','free'], 'nutricionist')){
        return Meteor.users.find({nutricionistId: currentUser});
    }

});

Meteor.methods({
    //@Method que busca un user en la bd
    findUser: function (id) {
        check(id, String);

        return Meteor.users.findOne(id);
    },
})
