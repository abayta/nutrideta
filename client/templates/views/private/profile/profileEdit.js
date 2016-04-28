/**
 * Created by Dani on 03/02/2016.
 */

Template.profileEdit.events({
    'click .option': function(event){
        var optionId = event.currentTarget.id;
        Session.set("activeTab",optionId);
        //i is the position, obj is the DOM object
        $('.option').each(function(i, obj) {
            $("#"+obj.id).removeClass('btn-primary');
            $("#"+obj.id).addClass('btn-default');
        });
        $("#"+optionId).removeClass('btn-default');
        $("#"+optionId).addClass('btn-primary')
    }
});

//Equals function to compare two strings for change a template
Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.profileEdit.helpers({
    active: function () {
        var active = Session.get("activeTab");
        return Template[active];
    }});

AutoForm.addHooks(['profileEdit'], {
    // Called when any submit operation fails
    onError: function(formType, error) {
        swal({
            title: "¡Se ha producido un error!",
            text: "No ha sido posible guardar el perfil",
            type: "error",
            html: true
        });
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
        swal({
            title: "¡Correcto!",
            text: "El perfil se ha modificado con éxito",
            timer: 2000,
            type: "success"
        });
    },
});

