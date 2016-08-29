/**
 * Created by abayta on 15/08/16.
 */
Days = new Mongo.Collection('days');

daysSchema = new SimpleSchema({

});

Days.helpers({
   meals() {
       return Meals.find({dayId: this._id});
   }
});