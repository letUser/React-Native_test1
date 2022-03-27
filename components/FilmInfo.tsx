import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import API from '../api/index';
import {Response, MovieParams} from '@interfaces/api';
import FilmItem from './FilmItem';

const FilmInfo = ({navigation, route}: any) => {
  const [info, setInfo] = React.useState<MovieParams>();
  const [cast, setCast] = React.useState<Response>();
  const [comments, setComments] = React.useState<any>();
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const getItems = async () => {
    setLoading(true);

    try {
      const [infoData, castData, commentsData] = await Promise.all([
        API.getFilmInfo(route.params.id),
        API.getFilmCast(route.params.id),
        API.getComments(route.params.id),
      ]);

      setInfo(infoData);
      setCast(castData);
      setComments(commentsData);
    } catch (err: any) {
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView>
      {!loading && (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            {info && <FilmItem prop={info} />}
            {cast && (
              <View style={styles.wrapperCast}>
                <Text style={styles.label}>Cast:</Text>
                <Text style={styles.cast}>{cast}</Text>
              </View>
            )}
          </View>
          <View style={styles.wrapperList}>
            <Text style={styles.labelComment}>Comments:</Text>
            <FlatList
              style={styles.list}
              data={comments}
              keyExtractor={item => item.id}
              renderItem={({item}: any) => (
                <View style={styles.comment}>
                  <Text style={styles.name}>{item.created_at}</Text>
                  <Text style={styles.text}>{item.message}</Text>
                </View>
              )}
            />
          </View>
          <View style={styles.wrapperText}>
            <TextInput
              onChangeText={setText}
              value={text}
              style={styles.textInput}
              placeholder="Type a comment..."
            />
            <TouchableOpacity onPress={() => {}}>
              <View style={styles.button}>
                <Text style={styles.textButton}>Send</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#F7F7F7',
  },
  wrapperCast: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 28,
    marginRight: 28,
  },
  wrapperList: {
    height: 350,
  },
  wrapperText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#B4B4B4',
  },
  cast: {
    fontWeight: 'bold',
    paddingBottom: 20,
  },
  labelComment: {
    margin: 20,
    fontWeight: 'bold',
    fontSize: 18,
  },
  list: {
    backgroundColor: '#F7F7F7',
    paddingTop: 20,
  },
  comment: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 26,
    padding: 10,
    backgroundColor: '#DBDBDB',
    borderRadius: 18,
  },
  name: {
    fontWeight: 'bold',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    padding: 5,
  },
  text: {
    padding: 5,
  },
  textInput: {
    width: 240,
    borderColor: '#97A4B6',
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
  },
  button: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#4074C1',
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default FilmInfo;
