import { client } from "@/index";
import { log } from "@/settings";
import { Command, Event } from "@discord/ruby";
import { sleep } from "@magicyan/discord";
import ck from "chalk";
import { version } from "discord.js";

new Event({
    name: "ready", 
    once: true, 
    async run() {
        console.log();
        log.success(`${ck.green("Bot online")} ${ck.blue.underline("discord.js")} 📦 ${ck.yellow(version)}`);
        log.info(`${ck.greenBright(`➝ Conectado como ${ck.underline(client.user?.username)}`)}`);
        console.log();
        
        await client.application?.commands.set(
            Array.from(Command.all.values())
        )
        .then(() => log.success(ck.green("Comandos registrados com sucesso!")))
        .catch(log.error);
    },
});