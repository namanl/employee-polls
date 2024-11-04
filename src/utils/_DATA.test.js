const { _saveQuestionAnswer, _saveQuestion } = require('./_DATA');
describe('SaveQuestionAnswer', () => {
  it('should return true if saved question is returned', async () => {
    const response = await _saveQuestion({
      optionOneText: 'test',
      optionTwoText: 'test',
      author: 'tylermcginnis',
    });
    expect(response).toBeTruthy();
  });

  it('should return false if error is thrown', async () => {
    const response = await _saveQuestion({
      optionOneText: undefined,
      optionTwoText: 'test',
      author: 'tylermcginnis',
    }).catch((e) => e);
    expect(response).toBe(
      'Please provide optionOneText, optionTwoText, and author'
    );
  });

  it('should return true for all correct parameters', async () => {
    const response = await _saveQuestionAnswer({
      authedUser: 'tylermcginnis',
      qid: 'vthrdm985a262al8qx3do',
      answer: 'optionOne',
    });

    expect(response).toBeTruthy();
  });

  it('should return error for false parameters', async () => {
    const response = await _saveQuestionAnswer({
      authedUser: 'tylermcginnis',
      qid: undefined,
      answer: 'optionOne',
    }).catch((e) => e);

    expect(response).toBe('Please provide authedUser, qid, and answer');
  });
});
