import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import {Colors} from '../constants/Colors';
import {fontHandler} from '../helpers/Helper';
import RNFS, {getFSInfo} from 'react-native-fs';
import GlobalHeader from '../components/widgets/GlobalHeader';
import StorageHeader from '../components/storageHeader/StorageHeader';
import FolderAndFileListCard from '../components/ListCards/FolderAndFileListCard';

const FileExplorer = props => {
  const [currentPath, setCurrentPath] = useState(
    RNFS.ExternalStorageDirectoryPath,
  );
  const [files, setFiles] = useState([]);
  const [freeSpace, setFreeSpace] = useState(0);
  const [totalSpace, setTotalSpace] = useState(0);

  useEffect(() => {
    requestExternalStoragePermission();
  }, [currentPath]);

  const requestExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'App Storage Permission',
          message: 'App needs access to your Storage ',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        loadFiles(currentPath);
        getFreeSpace(currentPath);
      } else {
        console.log('Storage permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const loadFiles = async path => {
    try {
      const result = await RNFS.readDir(path);
      setFiles(result);
    } catch (error) {
      console.error('Error reading directory:', error);
    }
  };

  const getFreeSpace = path => {
    RNFS.getFSInfo().then(info => {
      const freeSpaceGB = info.freeSpace / 1073741824;
      const totalSpaceGB = info.totalSpace / 1073741824;
      setFreeSpace(freeSpaceGB.toFixed(2));
      setTotalSpace(totalSpaceGB.toFixed(2));
    });
  };

  const renderDirectory = ({item}) => {
    return (
      <FolderAndFileListCard
        {...item}
        onClick={() =>
          props.navigation.navigate('FilesScreen', {
            path: currentPath + '/' + item.name,
          })
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <GlobalHeader
        leftTitle={'File Manager'}
        headerStyle={{paddingVertical: 12, paddingHorizontal: 12}}
        leftTitleStyle={{
          fontSize: 23,
          fontFamily: fontHandler('Skew-Medium'),
          color: Colors.primary_text_color,
        }}
      />
      <Text style={styles.title}>Storage</Text>
      <StorageHeader freeSpace={freeSpace} totalSpace={totalSpace} />
      <Text style={styles.title}>Internal Storage</Text>
      <FlatList
        data={files}
        renderItem={renderDirectory} 
        keyExtractor={(item, index) => index.toString()}
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primary_text_color,
    fontSize: 18,
    fontFamily: fontHandler('Skew-Medium'),
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  pathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  path: {
    fontSize: 16,
  },
});

export default FileExplorer;
