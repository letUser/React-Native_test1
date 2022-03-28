import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
  Keyboard,
} from 'react-native';
import API from '../api/index';
import {Response, MovieParams} from '@interfaces/api';
import FilmItem from './FilmItem';

const ERROR_MESSAGE = "Sorry, but we can't proceed with your request.";
const shortScreen = Dimensions.get('window').height < 540;
const longScreen = Dimensions.get('window').height > 740;

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
      Alert.alert('Error', ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async () => {
    if (text?.length > 0) {
      try {
        await API.sendComment(route.params.id, text);
        setText('');
        Keyboard.dismiss();
        const commentsData = await API.getComments(route.params.id);
        setComments(commentsData);
      } catch (err: any) {
        Alert.alert('Error', err.error ?? ERROR_MESSAGE);
      }
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView style={{height: '100%'}}>
      {!loading && (
        <KeyboardAvoidingView
          behavior="position"
          keyboardVerticalOffset={75}
          style={{height: '100%'}}>
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
              {!shortScreen && (
                <Text style={styles.labelComment}>Comments:</Text>
              )}
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
              <TouchableOpacity
                onPress={submitComment}
                disabled={text.length < 1}>
                <View style={text.length < 1 ? styles.disabled : styles.button}>
                  <Text style={styles.textButton}>Send</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
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
    height: shortScreen ? '40%' : longScreen ? '57%' : '53%',
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
    fontSize: shortScreen ? 12 : 14,
  },
  labelComment: {
    margin: 12,
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
    fontSize: shortScreen ? 12 : 14,
  },
  text: {
    padding: 5,
    fontSize: shortScreen ? 12 : 14,
  },
  textInput: {
    width: 240,
    borderColor: '#97A4B6',
    backgroundColor: 'white',
    marginRight: 10,
    borderRadius: 8,
    borderWidth: 1,
    height: 40,
    fontSize: shortScreen ? 12 : 14,
  },
  disabled: {
    width: 100,
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#BBBBBB',
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
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
    fontSize: shortScreen ? 12 : 14,
  },
  loader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FilmInfo;
