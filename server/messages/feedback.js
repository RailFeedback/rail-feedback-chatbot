import make from './message-make';

const types = require('../../data/feedback_types.json');

let feedbackMessageHandler = async function (message, fcns) {
    if (message === 'yes') {
        let rand_options = await fcns.words_getter();
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
