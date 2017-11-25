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

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

let handleMessage = function (message) {
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
        let index = getRandom(poss_strings.length);
        let response_string = poss_strings[index];

        return response_string.replace('{{topic}}', message)
    };
    // if a message is a quick reply, handle quickly
    let option = options[message];
    if (option) {
        return parseResponse(option)
    } else {// nothing fancy,
        return 'Can you tell us more?'
    }
};

module.exports = handleMessage;