import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './components/Login';
import FilmList from './components/FilmList';
import FilmInfo from './components/FilmInfo';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Sign In" component={Login} />
        <Stack.Screen name="Movies List" component={FilmList} />
        <Stack.Screen name="Movie" component={FilmInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
