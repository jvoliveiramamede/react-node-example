import { ConnectionDataBase } from "../config/ConnectionDataBase";
import { PointController } from "../controllers/PointController";
import { PointRepository } from "../repositories/PointRepository";
import { PointServiceImpl } from "../services/PointServiceImpl";

class PointFactory {

    public pointController!: PointController;

    constructor() {
        this.injectDependencies();
    }

    private injectDependencies() {
        const datasource = ConnectionDataBase.getInstance();
        const pointRepository = new PointRepository(datasource);
        const pointService = new PointServiceImpl(pointRepository);
        this.pointController = new PointController(pointService);
    }

}

export default new PointFactory();
