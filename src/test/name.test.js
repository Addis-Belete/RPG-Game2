import { setPlayerName, getPlayerName } from '../Score/Name';
test("Default player name should be 'Guest'", () => {
	expect(getPlayerName()).toBe('Guest');
});

test("If name input field is empty name should be 'Guest'", () => {
	setPlayerName('');
	expect(getPlayerName()).toBe('Guest');
});

test('Player name must be a string', () => {
	expect(typeof getPlayerName()).toBe('string');
});