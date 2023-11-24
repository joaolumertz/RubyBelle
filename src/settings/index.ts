import dotenv from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import { resolve, basename } from "node:path";
import { Signale } from "signale";
import settings from "./settings.json";
import "./constants";
import ck from "chalk";
import { ServiceAccount } from "firebase-admin";

const devEnvPath = resolve(__rootname, ".env.development");

const dev = existsSync(devEnvPath);

const { parsed: parsedEnv } = dotenv.config({
    path: existsSync(devEnvPath)
        ? devEnvPath
        : resolve(__rootname, ".env")
});

const processEnv = { ...(parsedEnv as NodeJS.ProcessEnv), dev };

const log = new Signale();

const fbAccPath = dev
    ? resolve(__rootname, "firebase.development.json")
    : resolve(__rootname, "firebase.json");

if (!existsSync(fbAccPath)) {
    const filename = ck.yellow(`"${basename(fbAccPath)}"`);
    const directory = ck.cyan(resolve(fbAccPath, ".."));
    const text = ck.red(`O arquivo ${filename} não foi encontrado dentro de ${directory}`);
    console.error(text);
    process.exit(0);
}

const fbAcc: ServiceAccount = JSON.parse(
    readFileSync(fbAccPath, { encoding: "utf-8" })
);

export { log, processEnv, settings, fbAcc };