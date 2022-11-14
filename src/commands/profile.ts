import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { Cooldown, User } from "../database";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("profile")
        .setDescription("Votre profil"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        let cooldowns = "";
        user.cooldowns.forEach((cooldown: Cooldown, key: string) => {
            cooldowns += `${key}: `;

            if(cooldown.isFinished())
                cooldowns += "Ready !\n";
            else
                cooldowns += cooldown.getTimeLeft() + '\n';
        });
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle(`Porfil de ${interaction.user.username}`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .addFields(
                { name: "solde:", value: `${user.balance.get()} ${interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)}`},
                { name: "cooldowns:", value: cooldowns},
                { name: "outils:", value: "work in progress... 👀" },
                { name: "collection:", value: "work in progress... 👀" }
            )

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;