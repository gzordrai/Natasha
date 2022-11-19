import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Vous permet de récuperer entre 1 et 200 pétales par jour (cd 24h)"),
    cooldown: 86400,
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const petals: number = Math.floor(Math.random() * 200);
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const embed: EmbedBuilder = new EmbedBuilder();

        user.balance.add(petals);
        await Database.save(user);

        embed.setTitle(`Vous avez gagné ${petals}${petalEmoji} !`);
        embed.setColor("Green");
    
        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;