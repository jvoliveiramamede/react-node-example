import { Router, Request, Response, NextFunction } from "express";
import PointFactory from "../factories/PointFactory";

export class PointRouter {

    public router: Router;

    constructor() {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        const pointController = PointFactory.pointController;
        this.router.post('/create',  (req: Request, res: Response, next: NextFunction) => pointController.create(req, res, next))
    }

    public static describeRoutes(): {
        url: Array<string>
    } {
        return {
            url: [
                '/point/create - POST - Create new point',
                '/point/list - GET - List all points'
            ]
        }
    }
}