import { RequestPoint } from "../model/dtos/RequestPoint";
import { RequestUser } from "../model/dtos/RequestUser";
import { PointEntity } from "../model/entities/PointEntity";
import { UserEntity } from "../model/entities/UserEntity";

export interface UserService {
  save(user: RequestUser): Promise<UserEntity | null>;
  addPoint(code: string, point: RequestPoint): Promise<UserEntity | null>
}
