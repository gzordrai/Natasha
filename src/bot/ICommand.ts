import { CommandInteraction, SlashCommandBuilder } from "discord.js";
import { ExtendedClient } from ".";

export interface ICommand {
    data: Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">;
    execute: (client: ExtendedClient, interaction: CommandInteraction) => Promise<void>;
}