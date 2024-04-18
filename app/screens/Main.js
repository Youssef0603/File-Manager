import {React} from 'react';
import Navigator from './Navigator';
import {connect} from 'react-redux';
import SplashScreen from './SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
function Main(props) {
  console.log(props);

  return (
    <NavigationContainer independent={true}>
      {!props.app.loaded && <SplashScreen />}
      {props.app.loaded && <Navigator />}
    </NavigationContainer>
  );
}

const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
