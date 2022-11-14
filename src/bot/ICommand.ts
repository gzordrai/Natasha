import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from ".";

export interface ICommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction) => Promise<void>;
}