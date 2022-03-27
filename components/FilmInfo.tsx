import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import API from '../api/index';
import {Response, MovieParams} from '@interfaces/api';
import FilmItem from './FilmItem';

const FilmInfo = ({route}: any) => {
  const [info, setInfo] = React.useState<MovieParams>();
  const [cast, setCast] = React.useState<Response>();

  const getItems = async () => {
    try {
      const [infoData, castData] = await Promise.all([
        API.getFilmInfo(route.params.id),
        API.getFilmCast(route.params.id),
      ]);

      setInfo(infoData);
      setCast(castData);

      console.log(castData, infoData);
    } catch (err: any) {
      throw err;
    }
  };

  React.useEffect(() => {
    getItems();
  }, []);

  return (
    <SafeAreaView>
      {info && (
        <FilmItem prop={info} />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
});

export default FilmInfo;
