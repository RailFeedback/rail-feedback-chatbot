import feedbackMessageHandler from './feedback';

test('should return no feedback response', async () => {
    const result = await feedbackMessageHandler('no');
    expect(["That's fine, hope you have a great journey!", "Understood, hope you have a great journey!"]).to.include(result.message.text);
});

test('should return not recognised input feedback response', async () => {
    const result = await feedbackMessageHandler('fish');
    expect(["I didn\'t understand that."]).to.include(result.message.text);
});

test('should return yes feedback response', async () => {
    const result = await feedbackMessageHandler('yes', {words_getter: () => ['toilet', 'lights', 'late']});
    expect(["Sorry to hear that, is it any of these? Or tell us your own"]).to.include(result.message.text);
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['toilet', 'lights', 'late']);
});
