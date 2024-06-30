import { EStatusErrors } from 'src/enums/status-error.enum';
import { prismaConnection } from 'src/prismaConnection';
import bcrypt from 'bcrypt';
import { authTokenUtils } from '../utils/auth-utils';
class AuthService {
  public async login(email: string, password: string) {
    const findUser = await prismaConnection.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) throw new Error(EStatusErrors.E404);

    if (!bcrypt.compareSync(password, findUser.password)) {
      throw new Error(EStatusErrors.E401);
    }

    return authTokenUtils.jwtGenerate(findUser);
  }
}

export const authService = new AuthService();
