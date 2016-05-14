/**
 * Created by Casa on 12/05/2016.
 */

//Publicamos los usuarios a los que se le pueden enviar mensajes
Meteor.publish('usersAvailableMessage', function () {
    var currentUser = this.userId;
    return Meteor.users.find({nutricionistId: currentUser});
});