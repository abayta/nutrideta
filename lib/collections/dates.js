/**
 * Created by a618052 on 08/06/2016.
 */

Dates = new Mongo.Collection("dates");

/**
 * Create the schema for Messages.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
dateSchema = new SimpleSchema({
    comment: {
        label: "Comment",
        type: String,
        optional: true,
        max: 2000,
        autoform: {
            placeholder: 'Type a message..'
        }
    },
    createdAt: {
        type: Date,
        label: "Created At",
        optional: true,
        autoValue: function () {
            return new Date();
        },
        autoform: {
            type: "hidden"
        }
    },
    client: {
        type: [String],
        optional: false,
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Meteor.users.find({_id: {$ne: Meteor.userId()}}).fetch(), function (user) {
                    return {
                        label: user.emails[0].address,
                        value: user._id
                    };
                });
            },
        }
    },
    day: {
        type: Date,
        label: "Day",
        optional: false,
    },
    hour: {
        type: String,
        label: "Hour",
        optional: false,
    },
    owner: {
        type: String,
        label: "Owner",
        optional: true,
        autoValue: function () {
            return Meteor.userId();
        },
        autoform: {
            type: "hidden"
        }
    },
/*    clientEmail: {
        type: String,
        label: "clientEmail",
        optional: false,
        autoValue: function () {
            return Meteor.users.findOne({ _id: id});
        },
        autoform: {
            type: "hidden"
        }
    },
    clientName: {
        type: String,
        label: "clientName",
        optional: false,
        autoValue: function () {
            return Meteor.userId();
        },
        autoform: {
            type: "hidden"
        }
    },*/

});

Dates.attachSchema(dateSchema);

Dates.methods = {};

Dates.methods.insert = new ValidatedMethod({
    name: 'Dates.methods.insert',
    validate: dateSchema.validator(),
    run(newDate) {
        if (!this.userId) {
            throw new Meteor.Error('Dates.methods.insert.not-logged-in',
                'Must be logged in to create a date.');
        }
        Dates.insert(newDate);
    }
});
