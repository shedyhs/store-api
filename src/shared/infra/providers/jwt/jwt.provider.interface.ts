import { JwtHeader, Algorithm } from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DecodeOutput = {
  [key: string]: any;
  iss?: string | undefined;
  sub?: string | undefined;
  aud?: string | string[] | undefined;
  exp?: number | undefined;
  nbf?: number | undefined;
  iat?: number | undefined;
  jti?: string | undefined;
};

export interface OptionsInput {
  algorithm?: Algorithm | undefined;
  keyid?: string | undefined;
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  expiresIn?: string | number | undefined;
  /** expressed in seconds or a string describing a time span [zeit/ms](https://github.com/zeit/ms.js).  Eg: 60, "2 days", "10h", "7d" */
  notBefore?: string | number | undefined;
  audience?: string | string[] | undefined;
  subject?: string | undefined;
  issuer?: string | undefined;
  jwtid?: string | undefined;
  mutatePayload?: boolean | undefined;
  noTimestamp?: boolean | undefined;
  header?: JwtHeader | undefined;
  encoding?: string | undefined;
}

export interface IJwtProvider {
  generate(payload: { payload: any; options: OptionsInput }): Promise<string>;
  decode(token: string): Promise<DecodeOutput>;
  verify(token: string): Promise<DecodeOutput>;
}
