import {Response} from '@interfaces/api';

export default class User {
  readonly token: string | undefined;
  readonly tokenType: string | undefined;
  readonly expiresIn: number | undefined;

  constructor(origin: Response) {
    this.token = origin?.data?.token;
    this.tokenType = origin?.data?.tokenType;
    this.expiresIn = origin?.data?.expiresIn;
  }
}
