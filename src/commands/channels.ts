import { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { channelNames, Rarety } from "../util";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("channels")
        .setDescription("Le taux de drop des noms de channel"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const legendaryNames: string = channelNames.legendary.toString().split(',').join("\n");
        const epicNames: string = channelNames.epic.toString().split(',').join("\n");
        const rareNames: string = channelNames.rare.toString().split(',').join("\n");
        const communNames: string = channelNames.commun.toString().split(',').join("\n");
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Taux de drop des noms")
            .setColor("Blue")
            .setThumbnail(client.user!.displayAvatarURL())
            .addFields(
                { name: `Légendaire (${Rarety.Legendary}%)`, value: legendaryNames },
                { name: `Epique (${Rarety.Epic}%)`, value: epicNames },
                { name: `Rare (${Rarety.Rare}%)`, value: rareNames },
                { name: `Commun (${Rarety.Commun}%)`, value: communNames }
            );

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;