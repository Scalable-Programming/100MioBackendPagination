import { router } from "./routers/comments/index";
import express, { Express } from "express";

class Server {
  #port: number;
  #app: Express;

  constructor(port: number, app: Express) {
    this.#port = port;
    this.#app = app;
  }

  init() {
    this.#app.use(express.json());
    this.#registerRoutes();
    this.#app.listen(this.#port, () => {
      console.log(`Successfully listening on port ${this.#port}`);
    });
  }

  #registerRoutes() {
    this.#app.use("/", router);
  }
}

const app = express();

const server = new Server(3001, app);

export { server };
