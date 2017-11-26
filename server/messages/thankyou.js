import make from './message-make';

let thankyouMessageHandler = function (message) {
    let reply = make.message("Thanks for your feedback!");
    return {message: reply, completed:true }
};

module.exports = thankyouMessageHandler;
