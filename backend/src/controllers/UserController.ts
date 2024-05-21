import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/UserService";
import { UserEntity } from "../model/entities/UserEntity";
import { ErrorInternal } from "../model/ErrorInternal";
import { PointEntity } from "../model/entities/PointEntity";
import { RequestPoint } from "../model/dtos/RequestPoint";

export class UserController {
  private service: UserService;

  constructor(service: UserService) {
    this.service = service;
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { code } = req.body;
      const user = new UserEntity(code);
      const response = await this.service.save(user);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json(new ErrorInternal("Error Internal"));
      throw new ErrorInternal("Error Internal")
      next(error);
    }
  }

  public async getByCode(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { code, hour, date } = req.body;
    const point = new RequestPoint(hour, date);
    const response = await this.service.addPoint(code, point);
    res.status(201).json(response);
  }
  
}
