import make from './message-make.js';

const S = require('string');

// Reformat response_options.json, make is easier to program with but keep simple definition
const options = require('../../data/response_options.json').reduce((opts, option) => {
    option.topics.forEach((topic) => {
        opts[topic] = option;
    });
    delete option.topics;
    return opts;
}, {});

const types = require('../../data/response_types.json');

/**
 * Given a message string from a facebook chat, create the appropriate response object
 *
 * @param message input message from chat
 * @return {object} message object
 */
function responseMessageHandler(message) {
    // if a message is a quick reply, handle quickly
    let option = options[message];
    if (option) {
        return {message: make.message(make.response(message, option, types), option['quick_replies']), completed: true}
    } else {// nothing fancy,
        return {message: makeMessage("Can you tell us more?"), completed: true}
    }
}

module.exports = responseMessageHandler;
