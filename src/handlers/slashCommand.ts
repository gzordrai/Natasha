import { CommandInteraction } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const handleSlashCommand = async (client: ExtendedClient, interaction: CommandInteraction): Promise<void> => {
    const command: ICommand = client.commands.get(interaction.commandName)!;

    try {
        await interaction.deferReply();
        await command.execute(client, interaction);
    } catch (error: unknown) {
        console.log(error);
        await interaction.reply({ content: "Une erreur inattendue s'est produite lors de l'éxecution de la commande !", ephemeral: true });
    }
}