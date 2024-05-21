import log4js, { Logger } from "log4js";
import { RequestPoint } from "../model/dtos/RequestPoint";
import { RequestUser } from "../model/dtos/RequestUser";
import { PointEntity } from "../model/entities/PointEntity";
import { UserEntity } from "../model/entities/UserEntity";
import { PointRepository } from "../repositories/PointRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserService } from "./UserService";

export class UserServiceImpl implements UserService {
  private repository: UserRepository;
  private pointRepository: PointRepository;
  private logger: Logger = log4js.getLogger();

  constructor(repository: UserRepository, pointRepository: PointRepository) {
    this.repository = repository;
    this.pointRepository = pointRepository;
    this.logger.level = "debug";
  }

  public async save(user: RequestUser): Promise<UserEntity> {
    try {
      
      const isExisted = await this.repository.byCode(user.code);

      if(isExisted) {
        console.log(isExisted)
        return isExisted;
      }

      return await this.repository.save(new UserEntity(user.code));
    } catch (error) {
      this.logger.error(`Error saving user: ${error}`);
      throw error;
    }
  }

  public async addPoint(code: string, point: RequestPoint): Promise<UserEntity | null> {
    try {
      const user = await this.repository.byCode(code);

      if (!user) {
        throw new Error(`User not found for code: ${code}`);
      }

      const newPoint = new PointEntity(point.date, point.hour, user);

      await this.pointRepository.save(newPoint);
      this.logger.info(`Point added on user: ${user.code}`);

      user.points.push(newPoint);

      const updatedUser = await this.repository.save(user);

      return updatedUser;

    } catch (error) {
      this.logger.error(`Error adding point: ${error}`);
      return null; // Retorna null em caso de erro
    }
  }
}
