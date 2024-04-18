import React from 'react';
import HomeScreen from '../app/screens/HomeScreen'; 
import renderer from 'react-test-renderer';


describe('HomeScreen component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});