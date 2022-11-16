import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Votre profil"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        const embed: EmbedBuilder = new EmbedBuilder();
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;

        embed.setTitle(`Profil de ${interaction.user.username}`);
        embed.setThumbnail(interaction.user.displayAvatarURL());
        embed.addFields(
            { name: "Solde:", value: `${user.balance.get()} ${petalEmoji}` },
            { name: "Outils:", value: "work in progress... 👀" },
            { name: "Collection:", value: "work in progress... 👀" }
        );

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;