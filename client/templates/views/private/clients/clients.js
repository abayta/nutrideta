/**
 * Created by Danjimgar on 01/04/2016.
 */

Template.clients.events({
    'click .option': function(event){
        var optionId = event.currentTarget.id;
        Session.set("activeClients",optionId);
    }
});

//Equals function to compare two strings for change a template
Template.registerHelper('equals', function (a, b) {
    return a === b;
});

Template.clients.helpers({
    active: function () {
        var active = Session.get("activeClients");
        return Template[active];
    }});