import {RawError} from '@interfaces/api';

export default class Error {
  readonly status: number | undefined;
  readonly error: string | undefined;

  constructor(origin: RawError) {
    this.status = origin?.response?.status;
    this.error = origin?.response?.data?.errorMessage;
  }
}
