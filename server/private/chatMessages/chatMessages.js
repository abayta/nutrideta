/**
 * Created by Casa on 27/05/2016.
 */

/*Meteor.publish('chat', function(idPar){
    var currentUser = this.userId;
    return ChatMessages.find({$or: [{$and: [{sender: idPar}, {recipient: currentUser}]}, {$and: [{sender: currentUser}, {recipient: idPar}]}]})
});*/

Meteor.publish('chat', function(){
    var currentUser = this.userId;
    return ChatMessages.find({$or: [{sender: currentUser}, {recipient: currentUser}]})
});