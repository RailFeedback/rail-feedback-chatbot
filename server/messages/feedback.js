import make from './message-make';

const types = require('../../data/feedback_types.json');

let feedbackMessageHandler = function (message) {
    if (message === 'yes') {
        let rand_options = ['toilet', 'lights', 'late'];
        let reply = make.message("Sorry to hear that, is it any of these? Or tell us your own", rand_options);
        return {message: reply, next: true}
    } else if (message === 'no') {
        let response = make.response('hope you have a great journey!', {type: 'no'}, types);
        let reply = make.message(response);
        return {message: reply, complete: true}
    } else {
        return {message: make.message('I didn\'t understand that.'), previous: true}
    }
};

module.exports = feedbackMessageHandler;