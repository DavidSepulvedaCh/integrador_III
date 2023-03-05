import express, { Application, json } from "express";
import MongoRoute from "./route/mongoRoute";
import verifyToken from "./middlewares/Middlewares";
import { unless } from "express-unless";

class Server {

    private backend: Application;
    private mongoRouter: MongoRoute;

    constructor(){
        this.mongoRouter = new MongoRoute();
        this.backend = express();
        this.config();
        this.route();
    }

    private config(){
        this.backend.set('port', process.env.PORT || 3000);
        this.backend.use(json());
        verifyToken.unless = unless;
        this.backend.use(
            verifyToken.unless({
                path: [
                    { url: '/api/users/login', methods: ['POST'] },
                    { url: '/api/users/register', methods: ['POST'] }
                ]
            })
        );
    }

    public route = (): void => {
        this.backend.use('/api', this.mongoRouter.router);
    }

    public start(){
        this.backend.listen(this.backend.get('port'), () => {
            console.log(`Server on port ${this.backend.get('port')}`);
        });
    }
}

const server = new Server();
server.start();