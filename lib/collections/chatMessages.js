/**
 * Created by Casa on 27/05/2016.
 */

/**
 * Created by danjimgar on 16/02/2016.
 */

ChatMessages = new Mongo.Collection("chatMessages");

/**
 * Create the schema for Messages.
 * See: https://github.com/aldeed/meteor-autoform#common-questions
 * See: https://github.com/aldeed/meteor-autoform#affieldinput
 */
chatMessageSchema = new SimpleSchema({
    message: {
        label: "Message",
        type: String,
        optional: true,
        max: 100,
        autoform: {
            placeholder: 'Type a message..'
        }
    },
    recipient: {
        type: String,
        label: "Recipient",
        optional: true,
        autoform: {
            type: "hidden"
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
    }
});

ChatMessages.attachSchema(chatMessageSchema);

ChatMessages.methods = {};

ChatMessages.methods.insert = new ValidatedMethod({
    name: 'ChatMessages.methods.insert',
    validate: chatMessageSchema.validator(),
    run(newChatMessage) {

        if (!this.userId) {
            throw new Meteor.Error('ChatMessages.methods.insert.not-logged-in',
                'Must be logged in to create a message.');
        }
        ChatMessages.insert(newChatMessage);
    }
});

ChatMessages.allow({
    insert: function () { return true; }
});