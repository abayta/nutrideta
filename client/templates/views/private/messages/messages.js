/**
 * Created by danjimgar on 14/03/2016.
 */

Template.messages.events({
    'click .option': function(event){
        var optionId = event.currentTarget.id;
        Session.set("activeMessages",optionId);
        //i is the position, obj is the DOM object
        $('.option').each(function(i, obj) {
            $("#"+obj.id).removeClass('active');
        });
        $("#"+optionId).addClass('active')
    }
});

//Equals function to compare two strings for change a template
Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.messages.helpers({
    active: function () {
        var active = Session.get("activeMessages");
        return Template[active];
}});

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
