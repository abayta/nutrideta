/**
 * Created by a618052 on 08/06/2016.
 */

Template.calendar.helpers({
    events: function () {
        var fc = $('#calendar');
        return function (start, end, tz, callback) {
            //find all, because we've already subscribed to a specific range
            var events = Dates.find().map(function (it) {
                return {
                    title: it.client,
                    start: it.day.toISOString(),
                    allDay: false
                };
            });
            callback(events);
        };
    },
    onEventClicked: function () {
        return function (calEvent, jsEvent, view) {
            alert("Event clicked: " + calEvent.title);
        }
    },
    calendarHeader: function () {
        return {
            left: 'prev,next today myCustomButton',
            center: 'title',
            right: 'month,agendaWeek,agendaDay',
        }
    },
    calendarOptions: function () {
        return {
            defaultEventMinutes: 20,
            timezone: "Europe/Madrid"
        }
    },
});

Template.calendar.rendered = function () {
    var fc = this.$('#calendar');
    this.autorun(function () {
        //1) trigger event re-rendering when the collection is changed in any way
        //2) find all, because we've already subscribed to a specific range
        Dates.find();
        fc.fullCalendar('refetchEvents');
    });
};

AutoForm.addHooks(['insertDateForm'], {
    onSuccess: function (formType, result) {
        $('#cerrarBtn2').click();
    }
})

/*
Template.calendar.events({
    'click #newDate': function(event){
        alert("Hola");
    }
});
*/
