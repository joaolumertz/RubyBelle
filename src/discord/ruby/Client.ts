import { log, processEnv } from "@/settings";
import { CustomItents } from "@magicyan/discord";
import ck from "chalk";
import { Client, Partials, ClientOptions } from "discord.js";
import { glob } from "glob";
import { join } from "node:path";
import { Event } from ".";


export class RubyClient extends Client {
    constructor(options?: ClientOptions) {
        super({
            intents: CustomItents.All,
            partials: [
                Partials.Channel,
                Partials.GuildMember,
                Partials.Message,
                Partials.User,
                Partials.ThreadMember
            ],
            failIfNotExists: false,
            ...options
        });
    }

    public async start() {
        const discordDir = join(__dirname, "..");
        const paths = await glob([
            "commands/**/*.{ts,js}",
            "events/**/*.{ts,js}",
            "components/**/*.{ts,js}",
        ], { cwd: discordDir });

        for (const path of paths) await import(join(discordDir, path));
        Event.all.forEach(({ run, name, once }) => once
            ? this.once(name, run)
            : this.on(name, run)
        );
        super.login();
    }
}