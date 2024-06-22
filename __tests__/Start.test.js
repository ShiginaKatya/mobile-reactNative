import React from 'react';
import renderer from 'react-test-renderer';
import Start from '../components/Start';


test('renders correctly', () => {
  const tree = renderer.create(<Start />).toJSON();
  expect(tree).toMatchSnapshot();
});