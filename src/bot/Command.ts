import { ChatInputCommandInteraction, SlashCommandBuilder, SlashCommandSubcommandsOnlyBuilder } from "discord.js";
import { ExtendedClient } from ".";
import { User } from "../database";

export interface Command {
    data: SlashCommandBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup"> | SlashCommandSubcommandsOnlyBuilder;
    cooldown?: number;
    execute: (client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User) => Promise<void>;
}