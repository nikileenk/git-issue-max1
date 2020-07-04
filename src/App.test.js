import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const sum = require('./sum');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});