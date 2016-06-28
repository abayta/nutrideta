/**
 * Created by a618052 on 17/06/2016.
 */


Tracker.autorun(function () {
    //Anyadimos reactividad al onrendered
    Meteor.subscribe('statsByClient', Session.get('activeClients'));
});


Template.statsClient.onRendered(function () {
    //Lo usamos para que se reinicie el template
    this.autorun(function() {

// Flot charts data and options

        var data1 = [[0, 55], [1, 48], [2, 40], [3, 36], [4, 40], [5, 60], [6, 50], [7, 51], [8, 40], [9, 60], [10, 50], [11, 51], [12, 51], [13, 51], [14, 51], [15, 51], [16, 51], [17, 51], [18, 51], [19, 51], [20, 51], [21, 51], [22, 51], [23, 51], [24, 51], [25, 51], [26, 51], [27, 51], [28, 51], [29, 51], [30, 51], [31, 51], [32, 51], [33, 51], [34, 51]];

        var chartUsersOptions = {
            series: {
                splines: {
                    show: true,
                    tension: 0.4,
                    lineWidth: 1,
                    fill: 0.4
                }
            },
            grid: {
                tickColor: "#f0f0f0",
                borderWidth: 1,
                borderColor: 'f0f0f0',
                color: '#6a6c6f'
            },
            colors: ["#62cb31", "#efefef"]
        };

        $.plot($("#flot-line-chart"), [data1], chartUsersOptions);

        var stats = Stats.find();

        var arrayStats = stats.map(function (stat) {
            return stat.weight;
        });

        var arrayDates = stats.map(function (stat) {
            var date = stat.day;
            return moment(date).format('DD/MM/YYYY');
        });

        // Options for Sharp Line chart
        var sharpLineData = {
            labels: arrayDates,
            datasets: [
                {
                    label: "Example dataset",
                    fillColor: "rgba(98,203,49,0.5)",
                    strokeColor: "rgba(98,203,49,0.7)",
                    pointColor: "rgba(98,203,49,1)",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "rgba(98,203,49,1)",
                    data: arrayStats
                }
            ]
        };

        var sharpLineOptions = {
            scaleShowGridLines: true,
            scaleGridLineColor: "rgba(0,0,0,.05)",
            scaleGridLineWidth: 1,
            bezierCurve: false,
            pointDot: true,
            pointDotRadius: 4,
            pointDotStrokeWidth: 1,
            pointHitDetectionRadius: 20,
            datasetStroke: true,
            datasetStrokeWidth: 1,
            datasetFill: true,
            responsive: true
        };

        var ctx = document.getElementById("sharpLineOptions").getContext("2d");
        var myNewChart = new Chart(ctx).Line(sharpLineData, sharpLineOptions);
    });

});

Template.statsClient.helpers({
    'client': function () {
        var currentUserId = Session.get("activeClients");
        return Meteor.users.findOne({_id: currentUserId});
    },
    'memberSinceNow': function () {
        var currentUserId = Session.get("activeClients");
        var user = Meteor.users.findOne({_id: currentUserId});
        var date = user.createdAt;
        var since = moment(date).fromNow();
        return since;
    },
    'memberJoin': function () {
        var currentUserId = Session.get("activeClients");
        var user = Meteor.users.findOne({_id: currentUserId});
        return moment(user.createdAt).format('DD-MM-YYYY HH:mm');
    },
});

AutoForm.hooks({
    //Insertamos el id de usuario al que se le crea el Stat
    insertStatClient:{
        before: {
            insert: function(doc) {
                doc.userId = Session.get('activeClients');
                return doc;
            }
        }
    }
});
