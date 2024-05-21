import { DataSource, Point, Repository } from "typeorm";
import { PointEntity } from "../model/entities/PointEntity";

export class PointRepository {
    
    private repository: Repository<PointEntity>;

    constructor(datasource: DataSource) {
        this.repository = datasource.getRepository(PointEntity);
    }

    public async save(point: PointEntity): Promise<PointEntity> {
        return await this.repository.save(point);
    }

    public async findById(id: number): Promise<PointEntity | null> {
        return await this.repository.findOneBy({
            id: id
        });
    }

    public async updateById(id: number, point: Partial<PointEntity>): Promise<PointEntity | null> {
        const findPoint = await this.repository.findOneBy({ id });
        if (!findPoint) {
            return null;
        }
        Object.assign(findPoint, point);
        return await this.repository.save(findPoint);
    }

    public async deleteById(id: number): Promise<boolean> {
        const findPoint = await this.repository.findOneBy({ id });
        if (!findPoint) {
            return false;
        }
        
        await this.repository.remove(findPoint);
        return true;
    }

}