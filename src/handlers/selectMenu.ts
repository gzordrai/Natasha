import { EmbedBuilder, Message, SelectMenuInteraction } from "discord.js";
import { ExtendedClient, Command } from "../bot";

export const handleSelectMenu = async (client: ExtendedClient, interaction: SelectMenuInteraction): Promise<void> => {
    await interaction.deferReply();

    switch(interaction.customId) {
        case "help": await helpSelectMenu(client, interaction); break;
    }
}

const helpSelectMenu = async (client: ExtendedClient, interaction: SelectMenuInteraction): Promise<void> => {
    const command: Command = client.commands.get(interaction.values[0])!;
    const embed: EmbedBuilder = new EmbedBuilder()
        .setTitle(interaction.values[0])
        .setDescription(command.data.description);

    await interaction.followUp({ embeds: [embed] })
        .then((message: Message) => {
            setTimeout(() => {
                message.delete();
            }, 10000);
        })
}