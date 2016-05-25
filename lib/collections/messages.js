/**
 * Created by danjimgar on 16/02/2016.
 */

messages = "messages";  // avoid typos, this string occurs many times.

Messages = new Mongo.Collection(messages);

/**
 * Create the schema for Messages.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
messageSchema = new SimpleSchema({
    title: {
        label: "Title",
        type: String,
        optional: false,
        max: 35,
        autoform: {
            group: messages,
            placeholder: "Introduce a title"
        }
    },
    message: {
        label: "Message",
        type: String,
        optional: false,
        max: 2000,
        autoform: {
            group: messages,
            placeholder: 'Type a message..',
            rows: 5
        }
    },
    category: {
        label: "Category",
        type: String,
        optional: true,
        allowedValues: ['Highlight', 'Important', 'Private'],
        autoform: {
            group: messages,
            type: 'select-radio-inline'
        }
    },
    recipients: {
        type: [String],
        autoform: {
            type: "select2",
            options: function () {
                return _.map(Meteor.users.find().fetch(), function(user) {
                        return {
                            label: user.emails[0].address,
                            value: user._id
                        };
                });
            },
            afFieldInput: {
                multiple: true
            }
        }
    },
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
    viewed: {
        type: Boolean,
        optional: true,
        defaultValue: false,
        autoform: {
            type: "hidden"
        }
    },
    sender: {
        type: String,
        label: "Sender",
        optional: true,
        autoValue: function() {
            return Meteor.userId();
        },
        autoform: {
            type: "hidden"
        }
    },
    type: {
        type: String,
        autoform: {
            type: "hidden"
        },
        optional: false
    },
});

Messages.attachSchema(messageSchema);

Messages.methods = {};

Messages.methods.insert = new ValidatedMethod({
    name: 'Messages.methods.insert',
    validate: messageSchema.validator(),
    run(newMessage) {

        if (!this.userId) {
            throw new Meteor.Error('Messages.methods.insert.not-logged-in',
                'Must be logged in to create a message.');
        }
        newMessage.type("Mail");
        Messages.insert(newMessage);
    }
});