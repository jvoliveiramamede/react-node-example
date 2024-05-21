import express, { Application } from "express";
import { ConnectionDataBase } from "./config/ConnectionDataBase";
import { PointRouter } from "./routes/PointRouter";
import { UserRouter } from "./routes/UserRouter";
import cors from 'cors';
import log4js, { Logger } from "log4js";

export class Server {

    private app: Application;
    private port: number;
    private logger: Logger = log4js.getLogger();

    constructor(port: number) {
        this.app = express();
        this.port = port;
        this.middleware();
        this.configureCors();
        this.routes();

        this.logger.level = 'debug';
    }

    private async middleware() {
        this.app.use(express.json());

        try {
            await ConnectionDataBase.initialize();
        } catch (error) {
            console.log('Error to connect: ', error)
        }
    }

    private configureCors() {
        const corsOptions = {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization'],
            credentials: true,
        };

        this.app.use(cors(corsOptions));
    }

    private routes() {
        const pointRouter = new PointRouter();
        const userRouter = new UserRouter();
        this.app.use('/point', pointRouter.router);
        this.app.use('/user', userRouter.router);
    }

    public start(): void {
        this.app.listen(this.port, () => {
            this.logger.log(`Server listening on port ${this.port}`);
        });
    }

}
