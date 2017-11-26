import handleMessage from './index';

test('should ask for feedback', () => {
    const result = handleMessage(1);
    expect(result.message.text).to.equal("Is there anything wrong with the train?");
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['yes', 'no']);
    expect(result.next).to.equal(true);
});

test('should present feedback options', async () => {
    const result = await handleMessage(2, "yes", {words_getter: () => ['toilet', 'lights', 'late']});
    expect(["Sorry to hear that, is it any of these? Or tell us your own"]).to.include(result.message.text);
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['toilet', 'lights', 'late']);
});

test("should ask what's wrong with the toilets", async () => {
    const result = await handleMessage(3, "toilets", {word_conversion: (word) => {expect(word).to.equal("toilets")}});
    expect(["What is wrong with the toilets?", "What is up with the toilets?"]).to.include(result.message.text);
    expect(result.message.quick_replies.map(t => t.title)).to.have.members(['Unclean', 'Out of Order', 'Busy']);
});