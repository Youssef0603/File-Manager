import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../constants/Colors';
import PlusSVG from '../../assets/icons/svgs/PlusSVG.svg'
const PlusButton = (props) => {
  return (
    <TouchableOpacity
      onPress={()=>{
        props.onClick();
      }}
      style={{
        position: 'absolute',
        right: 15,
        bottom: 20,
        height: 45,
        width: 45,
        alignItems: 'center',
        justifyContent:'center'
      }}>
      <PlusSVG height={40} width={40} />
    </TouchableOpacity>
  );
};

export default PlusButton;
