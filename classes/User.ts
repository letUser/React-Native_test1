import {UserInfo} from '@interfaces/api';

export default class User {
  readonly token: string | undefined;
  readonly tokenType: string | undefined;
  readonly expiresIn: number | undefined;

  constructor(origin: UserInfo) {
    this.token = origin?.data?.access_token;
    this.tokenType = origin?.data?.token_type;
    this.expiresIn = origin?.data?.expires_in;
  }
}
