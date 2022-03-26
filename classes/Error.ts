import {Err} from '@interfaces/api';

export default class Error {
  readonly status: number | undefined;
  readonly error: string | undefined;

  constructor(origin: Err) {
    this.status = origin?.response?.status;
    this.error = origin?.response?.data?.errorMessage;
  }
}
