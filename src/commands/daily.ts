import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Cooldown, User } from "../database";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("daily")
        .setDescription("Vous permet de récuperer entre 1 et 200 pétales par jour (cd 24h)"),
    async execute(client: ExtendedClient, interaction: CommandInteraction): Promise<void> {
        const petals: number = Math.floor(Math.random() * 200);
        const user: User = await new User(interaction.user.id).sync();
        const cooldown: Cooldown = user.cooldowns.get("daily")!;
        const title: string = petals > 20 ? `Vous avez gagné ${petals} ${interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)} !` : `Vous avez gagné ${petals} ${interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)} (Cheh tu pu) !`;
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(title)

        if (cooldown.isFinished()) {
            user.balance.add(petals);
            cooldown.reset();
            await user.save();
            await interaction.followUp({ embeds: [embed] });
        } else
            await interaction.followUp({ content: `Merci de patienter encore ${cooldown.getTimeLeft()}` });
    }
}

export default command;