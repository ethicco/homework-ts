export type JwtPayload = {
  sub: string;
  email: string;
  firstName: string;
  iat: number;
  exp: number;
};
