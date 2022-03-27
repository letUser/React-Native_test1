import React from 'react';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import API from '../api/index';
import {Movie} from '../classes/index';
import FilmItem from './FilmItem';

let DATA: Movie[] = [];

const FilmList = ({navigation}: any) => {
  const [loading, setLoading] = React.useState(false);

  const getItems = async () => {
    setLoading(true);
    DATA = [];

    try {
      const response = await API.getFilmList();
      DATA = DATA.concat(response);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      {!loading && (
        <FlatList
          data={DATA}
          keyExtractor={item => item.key}
          renderItem={({item}: any) => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Movie', {id: item.id})}>
              <FilmItem prop={item} />
            </TouchableOpacity>
          )}
        />
      )}
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default FilmList;
