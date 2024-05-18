import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

class UserController {
  public async create(req: Request, res: Response) {
    try {
      const {name, email, password } = req.body;
      await prisma.user.create({
        data: {
          email: email,
          name: name,
          password: password,
        },
      });

      return res.status(201).send('User created with success');
    } catch (error) {
      return res.json(error);
    }
  }

  public async readAll(req: Request, res: Response) {
    try {
      const allUsers = await prisma.user.findMany();
      return res.status(200).json(allUsers);
    } catch (error) {
      return res.status(404).json(error);
    }
  }

  public read(req: Request, res: Response) {
    return res.status(201).json({
      message: 'Hello World!',
    });
  }
}

export default new UserController();
