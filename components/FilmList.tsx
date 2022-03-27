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
import {Movie} from '../classes/index';

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
            <View style={styles.wrapperList}>
              <View style={styles.wrapperImage}>
                <Image
                  style={styles.poster}
                  source={{
                    uri: item.posterUrl,
                  }}
                />
              </View>
              <View style={styles.wrapperLabel}>
                <Text style={styles.label}>Title:</Text>
                <Text style={styles.label}>Year:</Text>
                <Text style={styles.label}>Duration:</Text>
                <Text style={styles.label}>Rating:</Text>
              </View>
              <View style={styles.wrapperText}>
                <Text style={styles.info}>{item.title}</Text>
                <Text style={styles.info}>{item.year}</Text>
                <Text style={styles.info}>{item.duration}</Text>
                <Text style={styles.info}>{item.rating}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },
  wrapperList: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    margin: 10,
    padding: 15,
  },
  wrapperImage: {
    width: 90,
  },
  wrapperLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    width: 80,
  },
  wrapperText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
  },
  poster: {
    width: 65,
    height: 100,
  },
  label: {
    color: '#B4B4B4',
    fontWeight: 'bold',
  },
  info: {
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default FilmList;
