import axios from 'axios';
import {LoginParams} from '@interfaces/api';
import User from '../classes/User';
import Error from '../classes/Error';

const API = {
  async signIn(params: LoginParams): Promise<User | Error> {
    return axios
      .post('https://sarzhevsky.com/movies-api/Login', params)
      .then(res => {
        return new User(res);
      })
      .catch(err => {
        return new Error(err);
      });
  },
};

export default API;
