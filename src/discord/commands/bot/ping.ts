import { settings } from "@/settings";
import { brBuilder, createEmbedAuthor, hexToRgb } from "@magicyan/discord";
import { ApplicationCommandType, EmbedBuilder, hyperlink } from "discord.js";
import { Command } from "../../ruby";
import { client } from "@/index";

new Command({
    name: "ping",
    description: "Veja o ping do bot.",
    dmPermission,
    type: ApplicationCommandType.ChatInput,
    async run(interaction) {
        interaction.reply({ ephemeral, content: `Opa ${client.ws.ping.toFixed(2)}`});
    },
});