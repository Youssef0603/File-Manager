import DirectoryContentScreen from '../app/screens/DirectoryContentSreen';
import { render, fireEvent } from '@testing-library/react-native';

describe("Test create folderor file button", () =>{
    it("calls the requestWriteExternalStoragePermission function when the button is pressed", () => {
        const mockOnPress = jest.fn();

        const { getByTestId } = render(<DirectoryContentScreen onPress={mockOnPress} />)
        const pressCreateButton = getByTestId("CreateButton:Button:ClickMe");
        fireEvent.press(pressCreateButton)

        expect(mockOnPress).toHaveBennCalled();
     })
})