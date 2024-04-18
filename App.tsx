import React from 'react';
import {StyleSheet, StatusBar, LogBox} from 'react-native';
import Main from './app/screens/Main';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {store} from './app/redux/store';
import {Provider} from 'react-redux';


const App = (props: any) => {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
    <BottomSheetModalProvider>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#01A0AC"
          barStyle="dark-content"
        />
        <Main />
      </GestureHandlerRootView>
    </BottomSheetModalProvider>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default App;
