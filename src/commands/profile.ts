import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { Collectable, Tool, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Votre profil"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const embed: EmbedBuilder = new EmbedBuilder();
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        let tools: string = "- ";
        let collectables: string = "- ";

        user.inventory.getTools().forEach((tool: Tool) => {
            const emoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env[`${tool.getName().toUpperCase()}_EMOJI_ID`]!)!;

            tools += `x${tool.getCopies()} ${emoji}\n`;
        });

        user.inventory.getCollectables().forEach((collectable: Collectable) => {
            const emoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env[`${collectable.getName().toUpperCase()}_EMOJI_ID`]!)!;

            collectables += `x${collectable.getCopies()} ${emoji}\n`;
        });

        embed.setTitle(`Profil de ${interaction.user.username}`);
        embed.setThumbnail(interaction.user.displayAvatarURL());
        embed.addFields(
            { name: "Solde:", value: `${user.balance.get()} ${petalEmoji}` },
            { name: "Outils:", value: tools },
            { name: "Collection:", value: collectables }
        );

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;