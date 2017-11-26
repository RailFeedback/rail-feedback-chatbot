let handlers = [
    require('./welcome'),
    require('./issue'),
    require('./feedback'),
    require('./response'),
    require('./thankyou')
];

function handleMessage(index, message, fcns) {
  console.log('INDEX',index)
  return handlers[index](message, fcns)
}

module.exports = handleMessage;
