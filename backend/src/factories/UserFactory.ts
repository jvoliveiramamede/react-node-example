import { ConnectionDataBase } from "../config/ConnectionDataBase";
import { UserController } from "../controllers/UserController";
import { PointRepository } from "../repositories/PointRepository";
import { UserRepository } from "../repositories/UserRepository";
import { UserServiceImpl } from "../services/UserServiceImpl";

class UserFactory {
    public userController!: UserController;

    constructor() {
        this.injectDependencies();
    }

    private injectDependencies() {
        const datasource = ConnectionDataBase.getInstance();

        const pointRepository = new PointRepository(datasource);
        const userRepository = new UserRepository(datasource);
        
        const userService = new UserServiceImpl(userRepository, pointRepository);
        this.userController = new UserController(userService);
    }
}

export default new UserFactory();