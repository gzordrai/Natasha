import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Vous permet d'acheter des articles")
        .addSubcommand(subCommand =>
            subCommand
                .setName("item")
                .setDescription("Vous permet d'acheter un item")
                .addStringOption((option: SlashCommandStringOption) =>
                    option
                        .setName("article")
                        .setDescription("L'article que vous souhaitez acheter")
                        .addChoices()
                )
                .addIntegerOption(option =>
                    option
                        .setName("number")
                        .setDescription("Le nombre d'exemplaire que vous souhaitez acheter")
                        .setMinValue(1)
                )
        )
        .addSubcommand(subCommand =>
            subCommand
                .setName("tool")
                .setDescription("Vous permet d'acheter un outil")
                .addStringOption((option: SlashCommandStringOption) =>
                    option
                        .setName("article")
                        .setDescription("L'article que vous souhaitez acheter")
                        .addChoices()
                )
                .addIntegerOption(option =>
                    option
                        .setName("number")
                        .setDescription("Le nombre d'exemplaire que vous souhaitez acheter")
                        .setMinValue(1)
                )
        ),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        // const user: User = await new User(interaction.user.id).sync();

        await interaction.followUp({});
    }
}

export default command;