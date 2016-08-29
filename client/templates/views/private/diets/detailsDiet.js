/**
 * Created by abayta on 17/08/16.
 */
Template.meal.onCreated(function () {
    this.editMode = new ReactiveVar(false);
});

Template.detailsDiet.helpers({
    dietId: function () {
        return this._id;
    }
});

Template.meal.helpers({
    addRecipeFormId: function () {
        return this._id;
    },
    editMode: function () {
        return Template.instance().editMode.get();
    }
});

Template.meal.events({
    'click .bt-add': function (events, template) {
        template.editMode.set(!template.editMode.get());
    }
});