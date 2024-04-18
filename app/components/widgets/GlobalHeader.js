import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default function GlobalHeader(props) {
  const {
    leftTitle = null,
    rightTitle = null,
    leftAction = null,
    onPressLeftAction = null,
    rightAction = null,
    leftTitleStyle = {},
    rightTitleStyle = {},
    headerStyle = {},
    titleContainerStyle = {},
    titleTextStyle = {},
    showBackButton = false,
    additionalComponent = null, 
  } = props;

  return (
    <View style={[{ flexDirection: 'column', alignItems: 'center' }, headerStyle]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {leftAction && (
          <TouchableOpacity onPress={onPressLeftAction}>
            {leftAction}
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={leftAction}>
          {leftTitle && <Text style={leftTitleStyle}>{leftTitle}</Text>}
        </TouchableOpacity>
        <View style={[{ flex: 1, alignItems: 'center' }, titleContainerStyle]}>
          <Text style={titleTextStyle}>{props.title}</Text>
        </View>
        {rightAction && (
          <TouchableOpacity onPress={rightAction}>
            {rightTitle && <Text style={rightTitleStyle}>{rightTitle}</Text>}
          </TouchableOpacity>
        )}
      </View>
      {additionalComponent && (
        <View style={{ }}>
          {additionalComponent}
        </View>
      )}
    </View>
  );
}
