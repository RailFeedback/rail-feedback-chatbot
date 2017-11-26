import responseMessageHandler from './response';

test('should return toilet message object', async () => {
    const result = await responseMessageHandler("toilet", {word_conversion: (word) => {expect(word).to.equal("toilet")}});
    expect(["What is wrong with the toilet?", "What is up with the toilet?"]).to.include(result.message.text);
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});
