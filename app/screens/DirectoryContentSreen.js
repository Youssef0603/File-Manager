import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  Keyboard,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  TextInput,
  Modal,
} from 'react-native';
import RNFS from 'react-native-fs';
import {Colors} from '../constants/Colors';
import {fontHandler} from '../helpers/Helper';
import {RadioButton} from 'react-native-ui-lib';
import CloseSVG from '../assets/icons/svgs/CloseSVG.svg';
import PlusButton from '../components/widgets/PlusButton';
import FilterSVG from '../assets/icons/svgs/FilterSVG.svg';
import GlobalHeader from '../components/widgets/GlobalHeader';
import ChevronLeftSVG from '../assets/icons/svgs/ChevronLeftSVG.svg';
import ChevronLeftFilledSVG from '../assets/icons/svgs/ChevronLeftFilledSVG.svg';
import FolderAndFileListCard from '../components/ListCards/FolderAndFileListCard';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetTextInput,
} from '@gorhom/bottom-sheet';
const width = Dimensions.get('window').width;

const FilesSreen = props => {
  const createBottomSheetRef = useRef(null);
  const searchInputRef = useRef(null);
  const path = props.route.params.path;
  const [data, setData] = useState([]);
  const [oldData, setOldData] = useState([]);
  const [search, setSearch] = useState('');
  const [currentPath, setCurrentPath] = useState(path);
  const [folderNameError, setFolderNameError] = useState('');
  const [createdFolderName, setCreatedFolderName] = useState('');
  const [isFolderNameValid, setIsFolderNameValid] = useState(true);
  const [sortingModalVisible, setSortingModalVisible] = useState(false);
  const [selectedCreateOption, setSelectedCreateOption] = useState(null);

  const createOptions = [
    {id: 1, name: 'File'},
    {id: 2, name: 'Folder'},
  ];

  const sorters = [
    {id: 1, name: 'Sort from A-Z'},
    {id: 2, name: 'Sort from Z-A'},
    {id: 3, name: 'Sort from higher to lower size'},
    {id: 4, name: 'Sort from lower to higher size'},
  ];

  useEffect(() => {
    loadFiles(currentPath);
  }, []);

  const loadFiles = async path => {
    try {
      const result = await RNFS.readDir(path);
      setData(result);
      setOldData(result);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const handleCreateButtonPress = () => {
    createBottomSheetRef.current?.snapToIndex(2);
  };

  const handleFilePress = file => {
    if (file.isDirectory()) {
      const newPath = file.path;
      loadFiles(newPath);
      setCurrentPath(file.path);
    } else {
      console.log('File pressed:', file);
    }
  };

  const createFolder = () => {
    RNFS.mkdir(`${currentPath}/${createdFolderName}`)
      .then(result => {
        console.log('Created');
        loadFiles(currentPath);
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  const createFile = () => {
    var path = currentPath + '/' + createdFolderName;
    RNFS.writeFile(path, 'Lorem ipsum dolor sit amet', 'utf8')
      .then(success => {
        console.log('FILE WRITTEN!');
        loadFiles(currentPath);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  const handleOptionPress = optionName => {
    setSelectedCreateOption(optionName);
  };

  const validateFolderName = () => {
    if (createdFolderName.trim() === '') {
      setIsFolderNameValid(false);
      setFolderNameError('Folder name cannot be empty');
    } else {
      onCreate();
      Keyboard.dismiss();
      setFolderNameError('');
      setCreatedFolderName('');
      setSelectedCreateOption('');
      setIsFolderNameValid(true);
      createBottomSheetRef.current?.close();
    }
  };

  const onSubmitFolderName = () => {
    validateFolderName();
  };

  const onChangeText = text => {
    setCreatedFolderName(text);
  };

  const onSearch = text => {
    if (text == '') {
      setData(oldData);
    } else {
      let tempData = data.filter(item => {
        return item.name.toLowerCase().indexOf(text.toLowerCase()) > -1;
      });
      setData(tempData);
    }
  };

  const onSort = item => {
    let tempData = [];
    if (item.id == 1) {
      tempData = data.sort((a, b) => (a.name > b.name ? 1 : -1));
    } else if (item.id == 2) {
      tempData = data.sort((a, b) => (b.name > a.name ? 1 : -1));
    } else if (item.id == 3) {
      tempData = data.sort((a, b) => b.size - a.size);
    } else if (item.id == 4) {
      tempData = data.sort((a, b) => a.size - b.size);
    }

    setData(tempData);
    setSortingModalVisible(false);
  };

  const onCreate = () => {
    if (selectedCreateOption.toLowerCase() == 'file') {
      createFile();
    } else {
      createFolder();
    }
  };

  const renderItem = ({item}) => {
    return <FolderAndFileListCard {...item} onClick={()=>handleFilePress(item)} />;
  };

  const requestWriteExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your Storage',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        onSubmitFolderName();
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader
        leftAction={<ChevronLeftSVG height={22} width={22} marginRight={10} />}
        leftTitle={'Content'}
        onPressLeftAction={() => props.navigation.goBack()}
        headerStyle={{paddingVertical: 16, paddingHorizontal: 12}}
        leftTitleStyle={{
          fontSize: 16,
          fontFamily: fontHandler('Skew-Medium'),
          color: Colors.primary_text_color,
        }}
        additionalComponent={
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <TextInput
              ref={searchInputRef}
              placeholder={'search folders and files...'}
              value={search}
              onChangeText={text => {
                onSearch(text);
                setSearch(text);
              }}
              style={{
                width: width / 1.3,
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 5,
                height: 40,
                paddingHorizontal: 6,
                borderColor: Colors.light_gray,
                marginVertical: 10,
                alignItems: 'center',
              }}
            />
            <TouchableOpacity
              onPress={() => {
                setSortingModalVisible(true);
              }}>
              <FilterSVG height={27} width={27} marginLeft={15} />
            </TouchableOpacity>
          </View>
        }
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 12,
          paddingBottom: 6,
        }}>
        <TouchableOpacity
          onPress={() => {
            const slashCount = (currentPath.match(/\//g) || []).length; // Count occurrences of '/'
            if (slashCount > 4) {
              const lastSlashIndex = currentPath.lastIndexOf('/');
              if (lastSlashIndex !== -1) {
                const previousPath = currentPath.slice(0, lastSlashIndex);
                loadFiles(previousPath);
                setCurrentPath(previousPath);
              } else {
                console.log('No previous path available');
              }
            } else {
              props.navigation.goBack();
            }
          }}>
          <ChevronLeftFilledSVG height={22} width={22} />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontFamily: fontHandler('Skew-Medium'),
            color: Colors.primary_text_color,
            paddingHorizontal: 12,
          }}>
          {currentPath}
        </Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={
          <View
            style={{
              height: 1,
              backgroundColor: Colors.light_gray,
              marginHorizontal: 6,
            }}
          />
        }
      />
      <PlusButton onClick={handleCreateButtonPress} />
      <Modal
        visible={sortingModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSortingModalVisible(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={{alignSelf: 'flex-end', marginRight: 35, marginBottom: 15}}
            onPress={() => {
              setSortingModalVisible(false);
            }}>
            <CloseSVG height={30} width={30} fill={'#FFFFFF'} />
          </TouchableOpacity>
          <View
            style={{
              backgroundColor: Colors.white,
              width: width / 1.25,
              borderRadius: 10,
              paddingVertical: 11,
            }}>
            <FlatList
              data={sorters}
              renderItem={({item}) => {
                console.log(item);
                return (
                  <TouchableOpacity
                    style={{paddingVertical: 10, paddingHorizontal: 12}}
                    onPress={() => {
                      onSort(item);
                    }}>
                    <Text
                      style={{
                        color: Colors.primary_text_color,
                        fontSize: 16,
                        fontFamily: fontHandler('Skew-Bold'),
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              }}
              ItemSeparatorComponent={
                <View
                  style={{
                    height: 1,
                    backgroundColor: Colors.light_gray,
                    marginHorizontal: 6,
                  }}
                />
              }
            />
          </View>
        </View>
      </Modal>
      <BottomSheet
        index={-1}
        enableOverDrag
        enablePanDownToClose
        snapPoints={['1%', '10%', '45%']}
        ref={createBottomSheetRef}
        handleIndicatorStyle={{backgroundColor: Colors.white}}
        backdropComponent={props => <BottomSheetBackdrop {...props} />}>
        <View style={{flex: 1}}>
          <Text
            style={{
              color: Colors.primary_text_color,
              fontSize: 18,
              paddingHorizontal: 12,
              fontFamily: fontHandler('Skew-Medium'),
            }}>
            What you want to create?
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingVertical: 14,
            }}>
            {createOptions.map((option, index) => {
              return (
                <RadioButton
                  key={index}
                  value={option.id}
                  label={option.name}
                  size={18}
                  color={
                    selectedCreateOption === option.name
                      ? Colors.teal
                      : Colors.secondary_text_color
                  }
                  selected={selectedCreateOption === option.name}
                  labelStyle={{
                    color:
                      selectedCreateOption === option.name
                        ? Colors.teal
                        : 'black',
                    fontSize: 15,
                    fontFamily: fontHandler('Skew-Medium'),
                    textAlign: 'left',
                    alignSelf: 'flex-start',
                  }}
                  onPress={() => handleOptionPress(option.name)}
                  iconStyle={{
                    backgroundColor:
                      selectedCreateOption === option.name
                        ? Colors.teal
                        : 'black',
                  }}
                />
              );
            })}
          </View>
          <BottomSheetTextInput
            value={createdFolderName}
            editable={selectedCreateOption !== ''}
            onChangeText={onChangeText}
            placeholder="Enter the name"
            style={[
              styles.textFieldStyle,
              selectedCreateOption === null && styles.disabledTextInput,
            ]}
            onSubmitEditing={onSubmitFolderName}
          />
          {!isFolderNameValid && (
            <Text style={styles.errorText}>{folderNameError}</Text>
          )}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[
                styles.submitButton,
                {
                  backgroundColor: !selectedCreateOption
                    ? Colors.light_gray
                    : Colors.teal,
                },
              ]}
              onPress={requestWriteExternalStoragePermission}
              disabled={!selectedCreateOption}>
              <Text style={styles.submitButtonText}>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  textFieldStyle: {
    borderWidth: 1,
    borderColor: Colors.light_gray,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginTop: 8,
    width: width / 1.1,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginLeft: 12,
  },
  buttonContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  submitButton: {
    backgroundColor: Colors.teal, 
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
  submitButtonText: {
    color: Colors.white,
    fontSize: 17,
    fontFamily: fontHandler('Skew-Medium'),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  closeButton: {
    backgroundColor: Colors.teal,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 20,
    width: '50%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: Colors.white,
    fontSize: 16,
  },
});
export default FilesSreen;
