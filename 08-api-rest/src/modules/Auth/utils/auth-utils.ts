import jwt from 'jsonwebtoken';
type TUserPayload = {
  id: string;
  name: string | null;
  email: string;
  password?: string;
};

class AuthTokenUtils {
  public static async jwtGenerate(userPayload: TUserPayload) {
    const payload = userPayload;
    delete payload.password;

    const accessToken = jwt.sign(
      {
        sub: payload.id,
        iat: Date.now(),
      },
      'abcdefgh123',
      {
        expiresIn: '15m',
      },
    );
    const refreshToken = jwt.sign(
      { payload: { id: payload.id } },
      'abcdefgh123',
    );

    return { accessToken, refreshToken };
  }
}

export const authTokenUtils = AuthTokenUtils;
