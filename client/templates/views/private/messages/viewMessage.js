/**
 * Created by Casa on 12/05/2016.
 */

Template.viewMessage.helpers({
    message: function () {
        return Messages.findOne({_id: Session.get("activeMessages")});
    },
    'dateFromNow': function () {
        var message = Messages.findOne({_id: Session.get("activeMessages")});
        if (message != undefined) {
            var date = message.createdAt;
            var since = moment(date).fromNow();
            return since;
        } else {
            return 'Loading...';
        }
    },
    'dateSended': function () {
        var message = Messages.findOne({_id: Session.get("activeMessages")});
        return moment(message.createdAt).format('DD-MM-YYYY HH:mm');
    },
    recipientsNames: function () {
        var message = Messages.findOne({_id: Session.get("activeMessages")});
/*        var recipients = message.map(function (item) {
            return item.id;
        });*/
        var users = ReactiveMethod.call('findRecipientsById', message.recipients);

        if (users != undefined) {
            return users;
        } else {
            return 'Loading...';
        }
    },
    senderName: function (id) {
        var user = ReactiveMethod.call('findUser', id);
        if (user != undefined) {
            return user.username;
        } else {
            return 'Loading...';
        }
    },
});

