export interface Response {
  readonly data?: any;
}

export interface UserInfo {
  readonly data?: {
    readonly access_token?: string;
    readonly token_type?: string;
    readonly expires_in?: number;
  };
}

export interface RawError {
  readonly response?: {
    readonly status?: number;
    readonly data?: {
      readonly errorMessage?: string;
    };
  };
}

export interface LoginParams {
  readonly username: string;
  readonly password: string;
}
