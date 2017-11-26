function makeQuickReply(option) {
    return {
        title: option,
        content_type: 'text',
        // payload: option.replace(/\W+/g, '_').toUpperCase()
        payload: option
    };
}

function makeMessage(message, options = []) {
    return {
        text: message,
        quick_replies: options.map(makeQuickReply)
    }
}

function getRandom(max) {
    return Math.floor(Math.random() * max);
}

/**
 * Given an option and types object, create a response string
 * @param message message string
 * @param option {object} type, topics and options
 * @param types {object} map type to possible strings
 * @return {string}
 */
function parseResponse(message, option, types) {
    let poss_strings = types[option['type']];
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
    return response_string.replace('{{}}', message)
}

let make = {
    message: makeMessage,
    response: parseResponse
};

module.exports = make;