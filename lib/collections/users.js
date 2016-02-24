UserProfileSchema = new SimpleSchema({
    firstName: {
        type: String,
        label: "Fist Name"
    },
    lastName: {
        type: String,
        label: "Last name"
    },
    adress: {
        type: String,
        label: "Adress"
    },
    phone: {
        type: String,
        label: "Phone"
    },
    birthday: {
        type: Date,
        label: "Birthday"
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
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
    }
});

RegistrationSchema = new SimpleSchema({
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
    profile_User: {
        type: UserProfileSchema,
        optional: true
    },
});

