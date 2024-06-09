import { Request, Response } from 'express';
import { z } from 'zod';
// eslint-disable-next-line import/no-unresolved
import { errorHandler } from 'src/utils/errorHandler';
import { userService } from '../service/UserService';

class UserController {
  public async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    // validate entries
    try {
      const ZUserSchema = z.object({
        name: z.string().optional(),
        email: z
          .string({ message: 'email is mandatory' })
          .email({ message: 'not a email format' }),
        password: z.string().min(8),
      });
      ZUserSchema.parse({ name, email, password });
    } catch (error) {
      return res.json(error);
    }

    // create user at database
    try {
      return res.status(201).json({
        message: 'User created with success',
        data: await userService.create({ name, email, password }),
      });
    } catch (error) {
      return res.status(409).json(errorHandler.getErrorMessage(error));
    }
  }

  // public async readAll(req: Request, res: Response) {
  //   try {
  //     const allUsers = await prismaConnection.user.findMany({
  //       select: {
  //         id: true,
  //         email: true,
  //         name: true,
  //       },
  //     });
  //     return res.status(200).json(allUsers);
  //   } catch (error) {
  //     return res.status(404).json(error);
  //   }
  // }

  public async read(req: Request, res: Response) {
    const { userId } = req.params;
    try {
      const ZUserIdSchema = z.string().uuid();
      ZUserIdSchema.parse(userId);
    } catch (error) {
      return res.json(error);
    }
    try {
      return res.status(200).json({
        message: 'User found',
        user: await userService.read({ userId }),
      });
    } catch (error) {
      return res.status(409).json(errorHandler.getErrorMessage(error));
    }
  }
}

export default new UserController();
