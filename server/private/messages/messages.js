/**
 * Created by danjimgar on 14/03/2016.
 */

Meteor.publish('inbox', function () {
    var currentUser = this.userId;
    return Messages.find({recipients: currentUser, category: {$ne: "Trash"}}, {sort: {createdAt: 1}, limit: 50});
});

Meteor.publish('outbox', function () {
    var currentUser = this.userId;
    return Messages.find({sender: currentUser, category: {$ne: "Trash"}}, {sort: {createdAt: 1}, limit: 50});
});

Meteor.publish('trash', function () {
    var currentUser = this.userId;
    return Messages.find({$and: [{category: "Trash"}, {$or: [{sender: currentUser}, {recipients: currentUser}]}]}, {
        sort: {createdAt: 1},
        limit: 50
    });
});

Meteor.publish('highlight', function () {
    var currentUser = this.userId;
    return Messages.find({$and: [{category: "HighLight"}, {$or: [{sender: currentUser}, {recipients: currentUser}]}]}, {
        sort: {createdAt: 1},
        limit: 50
    });
});

Meteor.publish('important', function () {
    var currentUser = this.userId;
    return Messages.find({$and: [{category: "Important"}, {$or: [{sender: currentUser}, {recipients: currentUser}]}]}, {
        sort: {createdAt: 1},
        limit: 50
    });
});

Meteor.publish('private', function () {
    var currentUser = this.userId;
    return Messages.find({$and: [{category: "Private"}, {$or: [{sender: currentUser}, {recipients: currentUser}]}]}, {
        sort: {createdAt: 1},
        limit: 50
    });
});


