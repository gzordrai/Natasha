import { APIEmbedField, ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { Database, Tool, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("shop")
        .setDescription("Le magasin"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder();
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const tools: Array<Tool> = await Database.getAllTools();
        let toolsShop: Array<APIEmbedField> = new Array<APIEmbedField>();

        tools.forEach((tool: Tool) => {
            toolsShop.push({
                name: `${tool.getName()}:`,
                value: `Prix: ${tool.getPrice()} ${petalEmoji}\nSolidité: ${100 - tool.getBreakRate()}%`
            });
        });

        embed.setTitle("Magasin");
        embed.setColor("Blue");
        embed.addFields(toolsShop);

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;