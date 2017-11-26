import responseMessageHandler from './message-response';

test('should return toilet message object with first string response', () => {
    const result = responseMessageHandler("toilet");
    expect(["What is wrong with the toilet?", "What is up with the toilet?"]).to.include(result.text);
    expect(result.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});
