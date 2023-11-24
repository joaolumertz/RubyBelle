import { RubyClient } from "./discord/ruby";
import { log } from "./settings";

const client = new RubyClient();
client.start();

export { client };

process.on("uncaughtException", log.error);
process.on("unhandledRejection", log.error);