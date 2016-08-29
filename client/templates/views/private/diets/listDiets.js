/**
 * Created by abayta on 14/08/16.
 */
var options = {
    keepHistory: 1000 * 60 * 5,
    localSearch: true
};
var fields = ['title', 'description'];

DietsSearch = new SearchSource('dietsSource', fields, options);

Template.searchResultDiets.helpers({
    getDiets: function() {
        return DietsSearch.getData();
    },
    isLoading: function() {
        return DietsSearch.getStatus().loading;
    }
});

Template.searchResultDiets.rendered = function(){
    DietsSearch.search('');
};

Template.searchBoxDiets.events({
    "keyup #search-box": _.throttle(function(e) {
        let text = $(e.target).val().trim();
        DietsSearch.search(text);
    }, 200),

});

Template.dietItem.events({
    'click .bt-delete': function () {
        console.log('Aqui entra',this);
        Meteor.call('Diets.methods.delete', {_id: this._id});
    }
});

Template.searchResultDiets.events({
    "click .bt-view": function () {
        Router.go("detailsDiet", {_id:this._id});
    },"click .bt-view": function () {
        Router.go("detailsDiet", {_id:this._id});
    }
});