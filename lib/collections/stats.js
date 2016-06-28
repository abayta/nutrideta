/**
 * Created by a618052 on 17/06/2016.
 */

Stats = new Mongo.Collection('stats');

statSchema = new SimpleSchema({
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true,
        autoValue: function() {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    },
    day: {
        type: Date,
        label: "Day",
        optional: false,
    },
    userId: {
        type: String,
        label: "UserId",
        optional: true,
        autoform: {
            type: "hidden"
        }
    },
    tall: {
        type: Number,
        label: "Tall in cm",
        min:120,
        max: 220
    },
    weight: {
        type: Number,
        label: "Weight in kg",
        min: 40,
        max: 200
    },
});

Stats.attachSchema(statSchema);

Stats.methods = {};

Stats.methods.insert = new ValidatedMethod({
    name: 'Stats.methods.insert',
    validate: statSchema.validator(),
    run(newStat) {

        if (!this.userId) {
            throw new Meteor.Error('Stats.methods.insert.not-logged-in',
                'Must be logged in to create a stat.');
        }

        Stats.insert(newStat);
    }
});

Stats.allow({
    update: function () { return true; },
    insert: function () { return true; }
});

