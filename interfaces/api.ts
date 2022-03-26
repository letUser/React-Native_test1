export interface Response {
  readonly data?: any;
}

export interface Err {
  readonly response?: {
    readonly status?: number;
    readonly data?: {
      readonly errorMessage?: string;
    };
  };
}

export interface CustomErr {
  readonly _ERROR?: boolean;
  readonly _ERROR_STATUS?: number;
  readonly _ERROR_MESSAGE?: string;
}

export interface LoginParams {
  readonly username: string;
  readonly password: string;
}
