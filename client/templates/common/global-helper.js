/**
 * Created by abayta on 25/08/16.
 */
Template.registerHelper('formatDate', function(date) {
    return moment(date).format('DD-MM-YYYY');
});