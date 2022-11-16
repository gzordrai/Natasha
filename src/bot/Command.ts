import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { ExtendedClient } from ".";

export interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction) => Promise<void>;
}