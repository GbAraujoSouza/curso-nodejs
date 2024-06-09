// eslint-disable-next-line import/no-unresolved
import { prismaConnection } from 'src/prismaConnection';
import bcrypt from 'bcrypt';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserService {
  public async create({ name, email, password }: IUser) {
    const user = await prismaConnection.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      throw new Error('User already exists');
    }

    const createdUser = await prismaConnection.user.create({
      data: {
        email: email,
        name: name,
        password: bcrypt.hashSync(password, 6),
      },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
    return createdUser;
  }

  public async read({ userId }: { userId: string }) {
    const user = await prismaConnection.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new Error('User no found');
    }
    return user;
  }
}

export const userService = new UserService();
