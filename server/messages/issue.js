import make from './message-make';

let issueMessageHandler = function (message) {
    let options = ['yes', 'no'];
    let reply = make.message("Is there anything wrong with the train?", options);
    return {message: reply, next: true}
};

module.exports = issueMessageHandler;