import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { ExtendedClient } from ".";

export interface ICommand {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction) => Promise<void>;
}