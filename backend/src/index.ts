import { PointRouter } from "./routes/PointRouter";
import { UserRouter } from "./routes/UserRouter";
import { Server } from "./server";
import log4js from 'log4js';

const urlsPoint = PointRouter.describeRoutes();
const urlsUser = UserRouter.describeRoutes();

var logger = log4js.getLogger();
logger.level = "debug";


urlsPoint.url.map((value: string) => {
    logger.debug(value);
});

urlsUser.url.map((value: string) => {
    logger.debug(value);
})

const server = new Server(4000);
server.start();