import { start } from "./infrastructure/webserver/server.js";
import config from "./config/index.js";

start(config.port);
