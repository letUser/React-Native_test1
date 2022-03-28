import React, {memo} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
} from 'react-native';

const shortScreen = Dimensions.get('window').height < 540;

const FilmItem = ({prop}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.wrapperList}>
        <View style={styles.wrapperImage}>
          <Image
            style={styles.poster}
            source={{
              uri: prop.posterUrl,
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
          <Text style={styles.info}>{prop.title}</Text>
          <Text style={styles.info}>{prop.year}</Text>
          <Text style={styles.info}>{prop.duration}</Text>
          <Text style={styles.info}>{prop.rating}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapperList: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    margin: 10,
    padding: 15,
  },
  wrapperImage: {
    width: shortScreen ? 70 : 90,
  },
  wrapperLabel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
    width: shortScreen ? 60 : 80,
  },
  wrapperText: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    margin: 5,
  },
  poster: {
    width: shortScreen ? 55 : 65,
    height: shortScreen ? 85 : 100,
  },
  label: {
    color: '#B4B4B4',
    fontWeight: 'bold',
    fontSize: shortScreen ? 12 : 14,
  },
  info: {
    fontWeight: 'bold',
    fontSize: shortScreen ? 12 : 14,
  },
});

export default memo(FilmItem);
