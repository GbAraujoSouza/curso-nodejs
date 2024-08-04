import { Request, Response, NextFunction } from 'express';
import { EStatusErrors } from 'src/enums/status-error.enum';
import { errorHandler } from 'src/utils/errorHandler';
import { EZod } from 'src/enums/zod.enum';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

export class AuthMiddleware {
  public static async authenticate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const token = req.headers['authorization'] || '';
    try {
      const ZAuthSchema = z
        .string()
        .min(25, { message: `Token ${EZod.REQUIRED}` });

      ZAuthSchema.parse(token);
    } catch (error) {
      return res.status(400).json({
        message: EStatusErrors.E400,
        erros: errorHandler.getErrorMessage(error),
      });
    }

    try {
      jwt.verify(token, `${process.env.JWT_SECRET}`);
    } catch (error) {
      return res.status(401).json({
        error: EStatusErrors.E401,
      });
    }

    const paramsId = req.params.id;
    const decoded = ((jwt.decode(token)) as { payload: { id: string } })
      .payload;

    if (paramsId && paramsId !== decoded.id) {
      return res.status(400).json({
        message: EStatusErrors.E400,
      });
    }

    // req.tokenUserId = decoded.id;
    next();
  }}
