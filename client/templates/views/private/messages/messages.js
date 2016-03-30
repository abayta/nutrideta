/**
 * Created by danjimgar on 14/03/2016.
 */

var messageGroupSelected = 'inbox';

Template.messages.events({
    'click .option': function(event){
        console.log("You clicked a .option element");
        var optionId = event.currentTarget.id;
        Session.set("activeMessages",optionId);
        $("#"+optionId).addClass('active')
    }
});

Template.messages.helpers({
    active: function () {
        return Session.get("activeMessages");
    }
});

AutoForm.addHooks(['createMessages'], {
    // Called when any submit operation fails
    onError: function(formType, error) {
        swal({
            title: "¡Se ha producido un error!",
            text: "No ha sido posible enviar el mensaje",
            type: "error",
            html: true
        });
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
        swal({
            title: "¡Enviado!",
            text: "El mensaje ha sido enviado correctamente",
            timer: 2000,
            type: "success"
        });
    },
});
