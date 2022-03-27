import React, {memo} from 'react';
import {SafeAreaView, StyleSheet, View, Image, Text} from 'react-native';

const FilmItem = ({prop}: any) => {
  console.log(prop);
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
});

export default memo(FilmItem);
