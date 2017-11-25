import responseMessageHandler from './message-response';

test('should return toilet message object with first string response', () => {
    const result = responseMessageHandler("toilet", () => 0);
    expect(result.text).to.equal("What is wrong with the toilet?");
    expect(result.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});

test('should return toilet message object with second string response', () => {
    const result = responseMessageHandler("toilet", () => 1);
    expect(result.text).to.equal("What is up with the toilet?");
    expect(result.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});
