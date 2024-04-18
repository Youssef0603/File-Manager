import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import compose from 'compose-function';
import { setLoaded } from '../redux/app/appSlice';
import DirectorySVG from '../assets/icons/svgs/DirectorySVG.svg';
import { Colors } from '../constants/Colors';
import { fontHandler } from '../helpers/Helper';

const SplashScreen = (props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setLoaded(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <DirectorySVG height={120} width={120} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerText}>File Manager</Text>
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    marginBottom: 50, 
  },
  footerText: {
    color: Colors.primary_text_color,
    fontSize: 22, 
    fontFamily: fontHandler('Skew-Bold'),
  },
  
});

const mapStateToProps = (state) => ({
  app: state.app,
});
const mapDispatchToProps = {
  setLoaded,
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(SplashScreen);
