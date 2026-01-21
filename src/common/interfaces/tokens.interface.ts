export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IGetTokensParams {
  id: string;
  email: string;
  firstName: string;
}
