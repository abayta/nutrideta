/**
 * Created by Casa on 12/05/2016.
 */

Template.viewMessage.helpers({
    message: function () {
        return Messages.findOne({_id: Session.get("activeMessages")});
    },
});