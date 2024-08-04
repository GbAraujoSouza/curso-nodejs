import jwt from 'jsonwebtoken';
type TUserPayload = {
  id: string;
  name: string | null;
  email: string;
  password?: string;
};

export class AuthTokenUtils {
  public static async jwtGenerate(userPayload: TUserPayload) {
    const payload = userPayload;
    delete payload.password;

    const accessToken = jwt.sign(
      {
        sub: payload.id,
        iat: Date.now(),
      },
      'abcdefgh123',
      { expiresIn: '15m' },
    );
    const refreshToken = jwt.sign(
      { payload: { id: payload.id } },
      'abcdefgh123',
      { expiresIn: '7d' },
    );

    return { accessToken, refreshToken };
  }
}
