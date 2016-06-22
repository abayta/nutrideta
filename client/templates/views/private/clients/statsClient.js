/**
 * Created by a618052 on 17/06/2016.
 */

Template.statsClient.onRendered(function () {

// Flot charts data and options
    var data1 = [[0, 55], [1, 48], [2, 40], [3, 36], [4, 40], [5, 60], [6, 50], [7, 51]];
    var data2 = [[0, 56], [1, 49], [2, 41], [3, 38], [4, 46], [5, 67], [6, 57], [7, 59]];

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

    $.plot($("#flot-line-chart"), [data1, data2], chartUsersOptions);

});

Template.statsClient.helpers({
    'client': function () {
        var currentUserId = Session.get("activeClients");
        return Meteor.users.findOne({_id: currentUserId});
    }
});
