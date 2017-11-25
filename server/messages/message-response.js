const S = require('string');

// Reformat options.json, make is easier to program with but keep simple definition
const options = require('../data/options.json').reduce((opts, option) => {
    option.topics.forEach((topic) => {
        opts[topic] = option;
    });
    delete option.topics;
    return opts;
}, {});

const responses = require('../data/responses.json');

function makeQuickReply(option) {
    return {
        title: option.toLowerCase(),
        content_type: 'text',
        // payload: option.replace(/\W+/g, '_').toUpperCase()
        payload: title
    };
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Given a message string from a facebook chat, create the appropriate response object
 *
 * @param message input message from chat
 * @param random function to randomly choose index of response from list of responses
 * @return {object} message object
 */
let handleMessage = function (message, random = getRandom) {
    let parseResponse = function (option) {
        let poss_strings = responses[option['type']];
        if (!poss_strings) {
            // type may be custom
            if (option['type'] === 'custom') {
                poss_strings = option['responses']
            }
            if (!poss_strings) {
                // still not found response...
                throw new Error("Could not find response string to format, message: " + message + "; type: " + option['type'])
            }
        }
        let index = random(poss_strings.length);
        let response_string = poss_strings[index];
        return response_string.replace('{{topic}}', message)
    };
    // if a message is a quick reply, handle quickly
    let option = options[message];
    if (option) {
        message = parseResponse(option)
    } else {// nothing fancy,
        message = 'Can you tell us more?';
        option = {};
        option.options = []
    }

    return {
        text: message,
        quick_replies: option['options'].map(makeQuickReply)
    }
};

module.exports = handleMessage;
