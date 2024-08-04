import { EStatusErrors } from 'src/enums/status-error.enum';
import { prismaConnection } from 'src/prismaConnection';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { AuthTokenUtils } from '../utils/auth-utils';
class AuthService {
  public async login(email: string, password: string) {
    const findUser = await prismaConnection.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        name: true,
        email: true,
        password: true,
      },
    });
    if (!findUser) throw new Error(EStatusErrors.E404);

    // compara a senha em hash armazenada no bd com a senha passada
    if (!bcrypt.compareSync(password, findUser.password)) {
      throw new Error(EStatusErrors.E401);
    }

    return AuthTokenUtils.jwtGenerate(findUser);
  }
  public async token(refresherToken: string) {
    try {
      jwt.verify(refresherToken, 'abcdefgh123');
    } catch (error) {
      throw new Error(EStatusErrors.E401);
    }

    const decode = (jwt.decode(refresherToken) as { payload: { id: string } })
      .payload;

    const findUser = await prismaConnection.user.findUnique({
      where: {
        id: decode.id,
      },
    });

    if (!findUser) throw new Error(EStatusErrors.E404);

    return AuthTokenUtils.jwtGenerate(findUser);
  }
}

export const authService = new AuthService();
