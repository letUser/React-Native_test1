import axios from 'axios';
import {LoginParams, MovieParams} from '@interfaces/api';
import {User, Error, Movie} from '../classes/index';

const API = {
  async signIn(params: LoginParams): Promise<User> {
    return axios
      .post('https://sarzhevsky.com/movies-api/Login', params)
      .then(res => {
        const data = new User(res);

        if (data?.tokenType && data?.token) {
          axios.defaults.headers.common.Authorization = `${data.tokenType} ${data.token}`;
        } else {
          throw {
            response: {
              data: {
                errorMessage:
                  'Invalid authorization token. Please, contact administrator.',
              },
            },
          };
        }

        return data;
      })
      .catch(err => {
        throw new Error(err);
      });
  },

  async getFilmList(): Promise<Movie> {
    return axios
      .get('https://sarzhevsky.com/movies-api/Movies')
      .then(res => {
        if (res?.data) {
          return res?.data.map((i: MovieParams) => new Movie(i));
        } else {
          throw {
            response: {
              data: {
                errorMessage:
                  "Can't reach Movie list. Please, contact administrator.",
              },
            },
          };
        }
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  async getFilmInfo(id: number): Promise<Movie> {
    return axios
      .get(`https://sarzhevsky.com/movies-api/Movies/${id}/Info`)
      .then(res => {
        console.log(res?.data);
        return res?.data;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
};

export default API;
