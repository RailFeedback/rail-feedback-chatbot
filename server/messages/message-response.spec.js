import responseMessageHandler from './message-response';

test('should return toilet message object', () => {
    const result = responseMessageHandler("toilet");
    expect(["What is wrong with the toilet?", "What is up with the toilet?"]).to.include(result.message.text);
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});
