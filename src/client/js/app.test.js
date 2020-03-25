import "babel-polyfill"
import {isFuture} from './app.js';

test('isCurrent', () => {
  let date = new Date();
  expect(isFuture(date)).toBe(false);
});

test('isFuture', () => {
  let date = new Date();
  expect(isFuture(new Date(date.getDate() + 7))).toBe(true);
});