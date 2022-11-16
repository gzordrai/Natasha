import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Vous permet de récuperer entre 1 et 200 pétales par jour (cd 24h)"),
    cooldown: 86400,
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        const petals: number = Math.floor(Math.random() * 200);
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const embed: EmbedBuilder = new EmbedBuilder();

        user.balance.add(petals);
        await user.save();

        embed.setTitle(`Vous avez gagné ${petals}${petalEmoji} !`);
        embed.setColor("Green");
    
        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;