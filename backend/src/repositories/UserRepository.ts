import { DataSource, Repository } from "typeorm";
import { UserEntity } from "../model/entities/UserEntity";
import { PointEntity } from "../model/entities/PointEntity";

export class UserRepository {

    private repository: Repository<UserEntity>

    constructor(datasource: DataSource) {
        this.repository = datasource.getRepository(UserEntity);
    }

    public async save(user: UserEntity) {
        return await this.repository.save(user);
    }

    public async byCode(code: string) {
        return await this.repository.findOneBy({
            code: code
        })
    }

    public async byCodeWithPoint(code: string) {
        return await this.repository.findOne({
            where: {
                code: code
            },
            relations: {
                points: true
            }
        })
    }

    public async addPoint(user: UserEntity, point: PointEntity): Promise<UserEntity> {
        user.points.push(point);
        return await this.repository.save(user);
    }

}