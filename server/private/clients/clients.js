/**
 * Created by Casa on 30/04/2016.
 */

Meteor.methods({
    createNewClient: function (data) {
        var newUserId = Accounts.createUser(data);
        return newUserId;
    },
    addClientToNutricionist: function (idClient) {
        var currentUser = this.userId;
        Meteor.users.update({_id: currentUser}, {$push: {clients: idClient}})
    },
    addNutricionistToClient: function (idClient) {
        var currentUser = this.userId;
        Meteor.users.update({_id: idClient}, {$set: {nutricionistId: currentUser}})
    },
})

Meteor.publish('clientsByNutritionist', function(){
    var currentUser = this.userId;
    return Meteor.users.find({ nutricionistId: currentUser}, {fields: {username:1, createdAt:1, 'emails.address':1, 'userProfile.firstName':1,'userProfile.lastName':1, 'userProfile.bio':1}, sort: {createdAt: 1}, limit: 10});
});