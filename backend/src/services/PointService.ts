import { RequestPoint } from "../model/dtos/RequestPoint";
import { PointEntity } from "../model/entities/PointEntity";

export interface PointService {
  create(point: RequestPoint): Promise<PointEntity>;
}
