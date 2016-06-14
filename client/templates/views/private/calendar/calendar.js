/**
 * Created by a618052 on 08/06/2016.
 */

Template.calendar.helpers({
    events: function () {
        var fc = $('#calendar');
        return function (start, end, tz, callback) {
            //find all, because we've already subscribed to a specific range
            var events = Dates.find().map(function (it) {
                var day = moment(it.day).format('YYYY-MM-DD');
                var startDate = day.concat("T"+it.hour);
                var endDate = moment(startDate).add(20, 'm');
                var user = Meteor.users.findOne({_id: it.client[0]});
                var email = user.emails[0].address;
                return {
                    title: email,
                    idDate: it._id,
                    start: startDate,
                    end: endDate,
                    allDay: false
                };
            });
            callback(events);
        };
    },
    onEventClicked: function () {
        return function (calEvent, jsEvent, view) {
            var date = Dates.findOne({_id: calEvent.idDate});
            alert(date.comment);
        }
    },
    calendarHeader: function () {
        return {
            left: 'prev,next today',
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
    // ClockPicker
    $('.clockpicker').clockpicker({autoclose: true});

    // DateTimePicker
    $('#datetimepicker1').datetimepicker();
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
