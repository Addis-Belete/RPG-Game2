import 'regenerator-runtime/runtime';
import { getHighScores, submitHighScore } from '../Score/Api';

test('Successfully receive JSON object via API using GET method', () => {
  getHighScores().then((data) => {
    expect(typeof data).toBe('object');
  });
});

test('Successfully receive to data', () => {
  getHighScores().then((data) => {
    expect(typeof data).toBe('object');
  });
});
test('Fail to receive to data', () => {
  getHighScores('wrong key').then((data) => {
    expect(data).toHaveLength(0);
  });
});
test('Fail to post data, without username as parameter', () => {
  submitHighScore().then((data) => {
    expect(data).toEqual({
      message: 'You need to provide a valid user for the score',
    });
  });
});