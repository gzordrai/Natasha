import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("collect")
        .setDescription("Vous permet de récuperer entre 1 et 20 pétales (cd 2h)"),
    cooldown: 7200,
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const petals: number = Math.floor(Math.random() * 20);
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const embed: EmbedBuilder = new EmbedBuilder();

        user.balance.add(petals);
        await Database.save(user);

        embed.setTitle(`Vous avez gagné ${petals} ${petalEmoji} !`);

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;