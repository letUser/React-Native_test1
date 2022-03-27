import {UserInfo} from '@interfaces/api';

export default class User {
  readonly token: string | undefined;
  readonly tokenType: string | null;
  readonly expiresIn: number | undefined;

  constructor(origin: UserInfo) {
    this.token = origin?.data?.access_token;
    this.tokenType = computeTokenTypeValue(origin);
    this.expiresIn = origin?.data?.expires_in;
  }
}

function computeTokenTypeValue(origin: UserInfo) {
  if (origin?.data?.token_type && origin?.data?.token_type.length > 1) {
    return (
      origin?.data?.token_type?.charAt(0).toUpperCase() +
      origin?.data?.token_type?.slice(1)
    );
  } else {
    return null;
  }
}
