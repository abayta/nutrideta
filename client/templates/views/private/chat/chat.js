/**
 * Created by Casa on 17/05/2016.
 */

Template.chat.events({
    'click .user': function (event) {
        var optionId = event.currentTarget.id;
        Session.set("activeChat", optionId);
    },
});

Template.chat.onCreated(function chatOnCreated() {
    this.autorun(() => {
        Meteor.subscribe("chat", Session.get("activeChat"));
    });
});

Template.chat.helpers({
    'usersOnline': function () {
        var id = Meteor.userId();
        return Meteor.users.find({_id: {$ne: id}});
    },
    isSender: function(id) {
        var currentChatSession =  Session.get("activeChat");
        if (id == currentChatSession) {
            return true;
        } else {
            return false;
        }
    },
    messages: function () {
        var otherUser = Session.get("activeChat");
        var currentUser = Meteor.userId();
            return ChatMessages.find({$or: [{$and: [{sender: otherUser}, {recipient: currentUser}]}, {$and: [{sender: currentUser}, {recipient: otherUser}]}]}, {sort: {createdAt: 1}});
    },
    toDate: function (date) {
        return moment(date).format('MM-DD-YYYY HH:mm:ss');
    },
    toUserName: function (id) {
        var user = Meteor.users.findOne({ _id: id});
        return user.username;
    },
    activeChat: function() {
        return Session.get('activeChat');
    },
    notEquals: function(a, b) {
        return a !== b;
    },
});