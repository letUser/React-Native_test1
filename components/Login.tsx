import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import API from '../api/index';

const Login = () => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const onPress = () => API.signIn({username, password});

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        onChangeText={onChangeUsername}
        value={username}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Password"
        secureTextEntry
      />
      <TouchableOpacity onPress={onPress}>
        <View style={styles.button}>
          <Text style={styles.text}>Sign In</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#97A4B6',
    backgroundColor: 'white',
  },
  button: {
    width: 300,
    height: 40,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#4074C1',
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Login;
