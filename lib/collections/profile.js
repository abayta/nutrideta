/**
 * Created by Danjimgar on 22/02/2016.
 */

Profiles = new Mongo.Collection('profiles');

profileSchema = new SimpleSchema({
    name: {
        type: String,
        label: "Name"
    },
    surname: {
        type: String,
        label: "Surname"
    },
    adress: {
        type: String,
        label: "Adress"
    },
    phone: {
        type: String,
        label: "Phone"
    },
    birthdayDate: {
        type: Date,
        label: "Birthday Date"
    },
    country: {
        type: String,
        label: "Country"
    },
    company: {
        type: String,
        label: "Company"
    },
    facebook: {
        type: String,
        label: "Facebook"
    },
    twitter: {
        type: String,
        label: "Twitter"
    },
    instagram: {
        type: String,
        label: "Instagram"
    },
    youtube: {
        type: String,
        label: "Youtube"
    },
    personalEmail: {
        type: String,
        label: "Personal Email"
    },
    description: {
        type: String,
        label: "Description"
    },
    user: {
        type: String,
        label: "User",
        optional: true,
        autoValue: function () {
            return this.userId;
        },
        autoform: {
            type: "hidden"
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
    }
});
Profiles.attachSchema(profileSchema);

Profiles.methods = {};

Profiles.methods.insert = new ValidatedMethod({
    name: 'Profiles.methods.insert',
    validate: profileSchema.validator(),
    run(newProfile) {

        if (!this.userId) {
            throw new Meteor.Error('Profiles.methods.insert.not-logged-in',
                'Must be logged in to create a profile.');
        }

        Profiles.insert(newProfile);
    }
});
