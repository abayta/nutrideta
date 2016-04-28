Schema = {};

Schema.NutritionistProfile = new SimpleSchema({
    nutritionistPhone: {
        type: String,
        optional: true,
        label: "Nutritionist Phone"
    },
    adress: {
        type: String,
        optional: true,
        label: "Adress"
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
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
    description: {
    type: String,
        optional: true,
        label: "Description"
    },
    maxClients: {
        type: Number,
        label: "Max number of clients",
        optional: true,
        min: 0
    },
    clients: {
        type: [String],
        optional: true,
        label: "Clients"
    },
    expirationLicence: {
        type: Date,
        optional: true,
        label: "Expiration licence"
    }
});

Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: true,
        label: "First Name"
    },
    lastName: {
        type: String,
        optional: true,
        label: "Last name"
    },
    personalPhone: {
        type: String,
        optional: true,
        label: "Phone"
    },
    birthday: {
        type: Date,
        optional: true,
        label: "Birthday"
    },
    country: {
        type: String,
        optional: true,
        label: "Country"
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        autoform: {
            options: [
                {label: "Male", value: "Male"},
                {label: "Female", value: "Female"}
            ]
        },
        optional: true
    },
    personalEmail: {
        type: String,
        optional: true,
        label: "Personal Email"
    },
    bio: {
        type: String,
        optional: true,
        label: "Bio"
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
    userProfile: {
        type: Schema.UserProfile,
        optional: true
    },
    nutritionistProfile: {
        type: Schema.NutritionistProfile,
        optional: true
    }
});

Meteor.users.allow({
    update: function () { return true; },
    insert: function () { return true; }
});

