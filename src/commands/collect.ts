import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder } from "discord.js";
import { Cooldown, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("collect")
        .setDescription("Vous permet de récuperer entre 1 et 20 pétales (cd 2h)"),
    cooldown: 7200,
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        const petals: number = Math.floor(Math.random() * 20);
        const petalEmoji: GuildEmoji = interaction.guild!.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        const embed: EmbedBuilder = new EmbedBuilder();

        user.balance.add(petals);
        await user.save();

        embed.setTitle(`Vous avez gagné ${petals} ${petalEmoji} !`);

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;