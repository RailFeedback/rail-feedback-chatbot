let handlers = [
    require('./welcome'),
    require('./issue'),
    require('./feedback'),
    require('./response')
];

function handleMessage(index, message, fcns) {
    return handlers[index](message, fcns)
}

module.exports = handleMessage;