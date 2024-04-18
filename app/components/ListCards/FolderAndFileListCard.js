import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {Colors} from '../../constants/Colors';
import {fontHandler} from '../../helpers/Helper';
import FileSVG from '../../assets/icons/svgs/FileSVG.svg';
import DirectorySVG from '../../assets/icons/svgs/DirectorySVG.svg';

const width = Dimensions.get('window').width;

const FolderAndFileListCard = props => {
  const item = props
  const itemName =
    item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name;
  return (
    <TouchableOpacity
      onPress={() => props.onClick()}
      activeOpacity={0.6}
      style={[styles.cardContainer]}>
      {item.isDirectory() ? (
        <DirectorySVG height={43} width={43} />
      ) : (
        <FileSVG height={43} width={43} />
      )}
      <View>
        <Text style={styles.itemNameText}>{itemName}</Text>
        <Text style={styles.itemSizeText}>{item.size} KB</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    width: width / 1.05,
    alignSelf: 'center',
  },
  itemNameText: {
    color: Colors.primary_text_color,
    fontSize: 15,
    fontFamily: fontHandler('Skew-Medium'),
    paddingHorizontal: 10,
  },
  itemSizeText: {
    color: Colors.secondary_text_color,
    fontSize: 13,
    fontFamily: fontHandler('Skew-Medium'),
    paddingHorizontal: 10,
  },
});

export default FolderAndFileListCard;
