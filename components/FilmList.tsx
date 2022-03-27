import React from 'react';
import {SafeAreaView, TouchableOpacity, FlatList} from 'react-native';
import API from '../api/index';
import {Movie} from '../classes/index';
import FilmItem from './FilmItem';

let DATA: Movie[] = [];

const FilmList = ({navigation}: any) => {
  const [loaded, update] = React.useState(false);

  const getItems = async () => {
    DATA = [];

    try {
      const response = await API.getFilmList();
      DATA = DATA.concat(response);
      update(!loaded);
    } catch (err: any) {
      throw err;
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView>
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
    </SafeAreaView>
  );
};

export default FilmList;
