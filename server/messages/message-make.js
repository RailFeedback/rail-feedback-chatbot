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

module.exports = makeMessage;