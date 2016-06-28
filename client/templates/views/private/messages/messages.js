/**
 * Created by danjimgar on 14/03/2016.
 */

Template.messages.events({
    'click .option': function (event) {
        var optionId = event.currentTarget.id;
        if (optionId == "createMessage") {
            Session.set("messages", optionId);
            Session.set("activeMessages", "usersAvailableMessage");
        } else {
            Session.set("messages", "mailbox");
            Session.set("activeMessages", optionId);
        }
        //i is the position, obj is the DOM object
        $('.option').each(function (i, obj) {
            $("#" + obj.id).removeClass('active');
        });
        $("#" + optionId).addClass('active')
    },
    'click .view': function (event) {
        var optionId = event.currentTarget.id;
            Session.set("messages", "viewMessage");
            Session.set("activeMessages", optionId);
    },
    
});

Template.messages.helpers({
    active: function () {
        var active = Session.get("messages");
        return Template[active];
    }
});

Template.messages.onCreated(function messagesOnCreated() {
    this.autorun(() => {
        if (Session.get("messages") == "viewMessage"){
            Meteor.subscribe('findMessage', Session.get("activeMessages"));
        } else {
        Meteor.subscribe(Session.get("activeMessages"));
        }
    });
});


AutoForm.hooks({
    createMessages:{
        // Called when any submit operation fails
        onError: function (formType, error) {
            swal({
                title: "¡Se ha producido un error!",
                text: "No ha sido posible enviar el mensaje",
                type: "error",
                html: true
            });
        },
        // Called when any submit operation succeeds
        onSuccess: function (formType, result) {
            swal({
                title: "¡Enviado!",
                text: "El mensaje ha sido enviado correctamente",
                timer: 2000,
                type: "success"
            });
        },
    }
});

Template.mailbox.helpers({
    messages: function () {
        return Messages.find({}, {sort: {createdAt: -1}});
    },
    senderName: function (id) {
        var user = ReactiveMethod.call('findUser', id);
        if(user != undefined){
              return user.username;
           }else{
               return 'Loading...';
           }
    },
    dateSended: function (date) {
        return moment(date).format('DD MMMM YYYY');
    },
});


