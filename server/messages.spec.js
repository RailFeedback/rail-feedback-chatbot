import handleMessage from './messages';

test('should return toilet message object with first string response', () => {
    const result = handleMessage("toilet", () => 0);
    expect(result.text).to.equal("What is wrong with the toilet?");
    expect(result.quick_replies).to.have.deep.members([
        {title: 'unclean', content_type: 'text', payload: 'UNCLEAN'},
        {title: 'out of order', content_type: 'text', payload: 'OUT_OF ORDER'},
        {title: 'busy', content_type: 'text', payload: 'BUSY'}
    ]);
});

test('should return toilet message object with second string response', () => {
    const result = handleMessage("toilet", () => 1);
    expect(result.text).to.equal("What is up with the toilet?");
    expect(result.quick_replies).to.have.deep.members([
        {title: 'unclean', content_type: 'text', payload: 'UNCLEAN'},
        {title: 'out of order', content_type: 'text', payload: 'OUT_OF ORDER'},
        {title: 'busy', content_type: 'text', payload: 'BUSY'}
    ]);
});
