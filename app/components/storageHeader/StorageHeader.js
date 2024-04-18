import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import ProgressCircle from 'react-native-progress-circle';
import { Colors } from '../../constants/Colors';
import { fontHandler } from '../../helpers/Helper';

const width = Dimensions.get('window').width;

const StorageHeader = ({ freeSpace, totalSpace}) => {
  const [freeSpacePercentage, setFreeSpacePercentage] = useState(0)

  useEffect(()=>{
    calculatePercentage()
  })

  const calculatePercentage = () =>{
    const fullspace = totalSpace - freeSpace
    const freeSpacePercentage =
    ((fullspace) / totalSpace) * 100;
    setFreeSpacePercentage(freeSpacePercentage.toFixed(2));

  }
  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <ProgressCircle
          percent={freeSpacePercentage}
          radius={60}
          borderWidth={15}
          color="#01A0AC"
          shadowColor="#EFEEEE"
          bgColor="#fff">
          <Text style={styles.percentageText}>{freeSpacePercentage}%</Text>
        </ProgressCircle>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.availableText}>
          Available : {freeSpace} GB
        </Text>
        <Text style={styles.totalText}>Total : {totalSpace} GB</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    borderRadius: 10,
    width: width / 1.05,
  },
  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 18,
  },
  infoContainer: {
    paddingVertical: 6,
    alignItems: 'center',
  },
  availableText: {
    color: Colors.teal,
    fontSize: 15,
    fontFamily: fontHandler('Skew-Bold'),
  },
  totalText: {
    color: Colors.primary_text_color,
    fontSize: 15,
    fontFamily: fontHandler('Skew-Medium'),
  },
});

export default StorageHeader
