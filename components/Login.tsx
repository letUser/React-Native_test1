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

const Login = ({navigation}: any) => {
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const [errorUsernameText, setErrorUsernameText] = React.useState('');
  const [errorPasswordText, setErrorPasswordText] = React.useState('');
  const [errorFetchText, setErrorFetchText] = React.useState('');

  const submit = async () => {
    let checkUsername = false;
    let checkPassword = false;
    setErrorFetchText('');

    if (username.length === 0) {
      setErrorUsernameText('Email is required');
    } else if (!username.includes('@')) {
      setErrorUsernameText('Please, enter valid email address');
    } else if (!username.trim().length) {
      setErrorUsernameText('Email is required');
    } else if (username.length < 6) {
      setErrorUsernameText("Email can't be less than 6 characters");
    } else if (username.indexOf(' ') >= 0) {
      setErrorUsernameText("Email can't contain spaces");
    } else {
      setErrorUsernameText('');
      checkUsername = true;
    }

    if (password.length === 0) {
      setErrorPasswordText('Password is required');
    } else if (password.length < 8) {
      setErrorPasswordText("Password can't be less than 8 characters");
    } else if (password.indexOf(' ') >= 0) {
      setErrorPasswordText('Password cannot contain spaces');
    } else {
      setErrorPasswordText('');
      checkPassword = true;
    }

    if (checkUsername && checkPassword) {
      try {
        await API.signIn({username, password});
        setErrorFetchText('');
        navigation.navigate('Movies List');
      } catch (err: any) {
        setErrorFetchText(err.error);
      }
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <TextInput
          style={errorUsernameText.length > 0 ? styles.errInput : styles.input}
          onChangeText={onChangeUsername}
          value={username}
          placeholder="Email"
          keyboardType="email-address"
        />
        {errorUsernameText.length > 0 && (
          <Text style={styles.error}>{errorUsernameText}</Text>
        )}
        <TextInput
          style={errorPasswordText.length > 0 ? styles.errInput : styles.input}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        {errorPasswordText.length > 0 && (
          <Text style={styles.error}>{errorPasswordText}</Text>
        )}
        <TouchableOpacity onPress={submit}>
          <View style={styles.button}>
            <Text style={styles.text}>Sign In</Text>
          </View>
        </TouchableOpacity>
        {errorFetchText.length > 0 && (
          <Text style={styles.errorFetch}>{errorFetchText}</Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    marginLeft: 12,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: '#97A4B6',
    backgroundColor: 'white',
  },
  errInput: {
    height: 40,
    marginLeft: 12,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 4,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    borderColor: 'red',
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
  error: {
    fontSize: 12,
    color: 'red',
    marginLeft: 18,
  },
  errorFetch: {
    color: 'red',
    margin: 24,
    alignSelf: 'center',
  },
});

export default Login;
