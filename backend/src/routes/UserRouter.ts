import { Router, Request, Response, NextFunction } from "express";
import UserFactory from "../factories/UserFactory";

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    const userController = UserFactory.userController;
    this.router.post(
      "/create",
      (req: Request, res: Response, next: NextFunction) =>
        userController.create(req, res, next)
    );
  }

  public static describeRoutes(): {
    url: Array<string>;
  } {
    return {
      url: [
        "/user/create - POST - Create new user",
      ],
    };
  }

}
