import { NextFunction, Request, Response } from "express";
import { PointService } from "../services/PointService";
import { PointEntity } from "../model/entities/PointEntity";
import { RequestPoint } from "../model/dtos/RequestPoint";

export class PointController {

    private service: PointService;

    constructor(serivce: PointService) {
        this.service = serivce;
    }

    public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { date, hour } = req.body;
            const point = new RequestPoint(date, hour);
            const createdPoint = await this.service.create(point);
            res.status(201).json(createdPoint);
        } catch (error) {
            next(error);
        }
    }

}