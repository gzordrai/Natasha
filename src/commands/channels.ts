import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { channelNames, Rarety } from "../util";
import { ExtendedClient, Command } from "../bot";
import { User } from "../database";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("channels")
        .setDescription("Le taux de drop des noms de channel"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const legendaryNames: string = channelNames.legendary.toString().split(',').join("\n");
        const epicNames: string = channelNames.epic.toString().split(',').join("\n");
        const rareNames: string = channelNames.rare.toString().split(',').join("\n");
        const communNames: string = channelNames.commun.toString().split(',').join("\n");
        const embed: EmbedBuilder = new EmbedBuilder();

        embed.setTitle("Taux de drop des noms")
        embed.setColor("Blue")
        embed.setThumbnail(client.user!.displayAvatarURL())
        embed.addFields(
                { name: `Légendaire (${Rarety.Legendary}%)`, value: legendaryNames },
                { name: `Epique (${Rarety.Epic}%)`, value: epicNames },
                { name: `Rare (${Rarety.Rare}%)`, value: rareNames },
                { name: `Commun (${Rarety.Commun}%)`, value: communNames }
        );

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;