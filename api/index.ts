import axios from 'axios';
import {LoginParams} from '@interfaces/api';
import User from '../classes/User';
import Error from '../classes/Error';

const API = {
  async signIn(params: LoginParams): Promise<User | Error> {
    return axios
      .post('https://sarzhevsky.com/movies-api/Login', params)
      .then(res => {
        const data = new User(res);

        if (data?.tokenType && data?.token) {
          axios.defaults.headers.common.Authorization = `${data.tokenType} ${data.token}`;
        }

        return data;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
};

export default API;
