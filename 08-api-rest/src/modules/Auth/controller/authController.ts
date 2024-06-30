import { Request, Response } from 'express';
import { z } from 'zod';
import { EStatusErrors } from '../../../enums/status-error.enum';
import { errorHandler } from '../../../utils/errorHandler';
import { authService } from '../service/authService';

class AuthController {
  public async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const ZUserLoginSchema = z.object({
      email: z.string().email(),
      password: z.string({ message: 'olha a senha caralho' }),
    });
    try {
      ZUserLoginSchema.parse({ email, password });
    } catch (error) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        errorMessage: errorHandler.getErrorMessage(error),
      });
    }

    try {
      return res.json({
        data: await authService.login(email, password),
      });
    } catch (error) {
      const errorMsg = errorHandler.getErrorMessage(error);
      switch (errorMsg) {
        case EStatusErrors.E401:
          return res.status(401).json({ message: errorMsg });
        case EStatusErrors.E404:
          return res.status(404).json({ message: errorMsg });
      }
    }
  }
}

export const authController = new AuthController();
