import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Cooldown, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Vous permet de récuperer entre 1 et 200 pétales par jour (cd 24h)"),
    cooldown: 86400,
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const petals: number = Math.floor(Math.random() * 200);
        const user: User = await new User(interaction.user.id).sync();
        const cooldown: Cooldown = user.cooldowns.get("daily")!;
        const title: string = petals > 20 ? `Vous avez gagné ${petals} ${interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)} !` : `Vous avez gagné ${petals} ${interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)} (Cheh tu pu) !`;
        const embed: EmbedBuilder = new EmbedBuilder();

            if (cooldown.isFinished()) {
                user.balance.add(petals);
                cooldown.reset();
                await user.save();
                embed.setTitle(title);
            } else
                embed.setTitle(`Merci de patienter encore ${cooldown.getTimeLeft()} !`)
    
            await interaction.followUp({ embeds: [embed] });
    }
}

export default command;