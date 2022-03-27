import React from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View} from 'react-native';

const FilmList = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.wrapper} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

export default FilmList;
