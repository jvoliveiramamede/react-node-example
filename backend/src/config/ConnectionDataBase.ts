import { DataSource } from "typeorm";
import { PointEntity } from "../model/entities/PointEntity";
import { UserEntity } from "../model/entities/UserEntity";

export class ConnectionDataBase {

    private static instance: DataSource;

    constructor() {}

    public static getInstance(): DataSource {
        if (!ConnectionDataBase.instance) {
            ConnectionDataBase.instance = new DataSource({
                type: "postgres",
                host: "localhost",
                port: 5432,
                username: "example",
                password: "example",
                database: "example",
                entities: [PointEntity, UserEntity],
                synchronize: true,
                logging: false,
            });
        }
        return ConnectionDataBase.instance;
    }

    public static async initialize(): Promise<void> {
        const dataSource = ConnectionDataBase.getInstance();
        if (!dataSource.isInitialized) {
            await dataSource.initialize();
        }
    }
}
