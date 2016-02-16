/**
 * Created by Dani on 03/02/2016.
 */

// Run this when the meteor app is started
Meteor.startup(function () {
    //url_variable que define el email
    process.env.MAIL_URL = 'smtp://pepediaz130%40gmail.com:pepito333@smtp.gmail.com:465';
});