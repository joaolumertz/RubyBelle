import { client } from "@/index";
import { log } from "@/settings";
import { Command, Component, Event } from "@discord/ruby";
import { sleep } from "@magicyan/discord";
import ck from "chalk";
import { ApplicationCommandType, AutocompleteInteraction, ChatInputCommandInteraction, CommandInteraction, MessageContextMenuCommandInteraction, UserContextMenuCommandInteraction, version } from "discord.js";

new Event({
    name: "interactionCreate", 
    once: true, 
    async run(interaction) {
        const onAutoComplete = (autoCompleteInteraction: AutocompleteInteraction) => {
            const command = Command.all.get(autoCompleteInteraction.commandName);
            const interaction = autoCompleteInteraction as AutocompleteInteraction;
            if (command?.type == ApplicationCommandType.ChatInput && command.autoComplete){
                command.autoComplete(interaction);
            }
        };
        const onCommand = (commandInteraction: CommandInteraction) => {
            const command = Command.all.get(commandInteraction.commandName);
    
            switch(command?.type){
                case ApplicationCommandType.ChatInput:{
                    const interaction = commandInteraction as ChatInputCommandInteraction;
                    command.run(interaction);
                    return;
                }
                case ApplicationCommandType.Message:{
                    const interaction = commandInteraction as MessageContextMenuCommandInteraction;
                    command.run(interaction);
                    return;
                }
                case ApplicationCommandType.User:{
                    const interaction = commandInteraction as UserContextMenuCommandInteraction;
                    command.run(interaction);
                    return;
                }
            }
    
        };
        if (interaction.isCommand()) onCommand(interaction);
        if (interaction.isAutocomplete()) onAutoComplete(interaction);
        
        if (!interaction.isModalSubmit() && !interaction.isMessageComponent()) return;

        if (interaction.isModalSubmit()){
            const component = Component.find(interaction.customId, "Modal");
             component?.run(interaction); return;
        }
        if (interaction.isButton()) {
            const component = Component.find(interaction.customId, "Button");
            component?.run(interaction); return;
        }
        if (interaction.isStringSelectMenu()) {
            const component = Component.find(interaction.customId, "StringSelect");
            component?.run(interaction); return;
        }
        if (interaction.isChannelSelectMenu()) {
            const component = Component.find(interaction.customId, "ChannelSelect");
            component?.run(interaction); return;
        }
        if (interaction.isRoleSelectMenu()) {
            const component = Component.find(interaction.customId, "RoleSelect");
            component?.run(interaction); return;
        }
        if (interaction.isUserSelectMenu()) {
            const component = Component.find(interaction.customId, "UserSelect");
            component?.run(interaction); return;
        }
        if (interaction.isMentionableSelectMenu()) {
            const component = Component.find(interaction.customId, "MentionableSelect");
            component?.run(interaction); return;
        }
    },
});