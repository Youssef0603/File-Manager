import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../app/screens/HomeScreen'; 

jest.mock('react-native-fs', () => ({
  readDir: jest.fn(),
}));

describe('HomeScreen component', () => {
  it('loads files correctly', async () => {
    const path = '/some/directory';
    const mockFiles = [
      { name: 'file1.txt', isFile: () => true },
      { name: 'file2.txt', isFile: () => true },
    ];

    const RNFS = require('react-native-fs');
    RNFS.readDir.mockResolvedValue(mockFiles);

    const { getByTestId } = render(<HomeScreen />);

    fireEvent.press(getByTestId('load-files-button')); 

    expect(setFiles).toHaveBeenCalledWith(mockFiles);
  });

  it('handles errors correctly', async () => {
    const path = '/some/nonexistent/directory';
    const errorMessage = 'Directory not found';

    const RNFS = require('react-native-fs');
    RNFS.readDir.mockRejectedValue(new Error(errorMessage));

    const { getByTestId } = render(<HomeScreen />);

    fireEvent.press(getByTestId('load-files-button')); 

    expect(console.error).toHaveBeenCalledWith('Error reading directory:', new Error(errorMessage));
  });
});
