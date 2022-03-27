import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  Text,
} from 'react-native';
import API from '../api/index';

const FilmInfo = ({navigation, route}: any) => {
  const [loaded, update] = React.useState(false);
  const [dataError, setDataError] = React.useState('');

  const getItems = async () => {
    try {
      await API.getFilmInfo(route.params.id);
    } catch (err: any) {
      setDataError(err.error);
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return <SafeAreaView />;
};

const styles = StyleSheet.create({});

export default FilmInfo;
