import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export const validateRequest =
  (schema: Joi.Schema, type: "body" | "params" | "query") =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedReqeust = await schema.validateAsync(req[type]);

      req["body"] = validatedReqeust;
      next();
    } catch (error) {
      res.status(404).json({ error });
    }
  };
