import { PointEntity } from "../model/entities/PointEntity";
import { PointRepository } from "../repositories/PointRepository";
import { PointService } from "./PointService";

export class PointServiceImpl implements PointService {
    
    private repository: PointRepository;

    constructor(repository: PointRepository) {
        this.repository = repository;
    }

    public async create(point: PointEntity): Promise<PointEntity> {
        try {
            return await this.repository.save(point);
        } catch (error) {
            throw new Error("Method not implemented.");
        }
    }

}