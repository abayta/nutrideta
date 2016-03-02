Schema = {};

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        label: "Fist Name"
    },
    lastName: {
        type: String,
        optional: true,
        label: "Last name"
    },
    adress: {
        type: String,
        optional: true,
        label: "Adress"
    },
    phone: {
        type: String,
        optional: true,
        label: "Phone"
    },
    birthday: {
        type: Date,
        optional: true,
        label: "Birthday"
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        autoform: {
            options: [
                {label: "Male", value: "male"},
                {label: "Female", value: "female"}
            ]
        },
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    country: {
        type: String,
        optional: true,
        label: "Country"
    },
    company: {
        type: String,
        optional: true,
        label: "Company"
    },
    facebook: {
        type: String,
        optional: true,
        label: "Facebook"
    },
    twitter: {
        type: String,
        optional: true,
        label: "Twitter"
    },
    instagram: {
        type: String,
        optional: true,
        label: "Instagram"
    },
    youtube: {
        type: String,
        optional: true,
        label: "Youtube"
    },
    personalEmail: {
        type: String,
        optional: true,
        label: "Personal Email"
    },
    description: {
        type: String,
        optional: true,
        label: "Description"
    }
});

Schema.User = new SimpleSchema({
    username: {
        type: String,
        optional: true
    },
    email: {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'password'
            }
        }
    },
    passwordConfirmation: {
        type: String,
        autoform: {
            afFieldInput: {
                type: 'password'
            }
        },
        custom: function() {
            if (this.isSet && this.value !== this.field('password').value) {
                return 'invalidPasswordConfirmation';
            }
        }
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
});

Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

