import { ActionRowBuilder, CommandInteraction, SelectMenuBuilder, SelectMenuComponentOptionData, SlashCommandBuilder } from "discord.js";
import { ExtendedClient, ICommand } from "../bot";

export const command: ICommand = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription("La liste des commandes"),
    async execute(client: ExtendedClient, interaction: CommandInteraction): Promise<void> {
        const row: ActionRowBuilder<SelectMenuBuilder> = new ActionRowBuilder<SelectMenuBuilder>();
        const commands: Array<SelectMenuComponentOptionData> = new Array<SelectMenuComponentOptionData>();

        client.commands.forEach((command: ICommand, key: string) => {
            commands.push({ label: command.data.name, description: command.data.description, value: command.data.name });
        });

        row.addComponents(
            new SelectMenuBuilder()
                .setCustomId(`help`)
                .setPlaceholder("Selectionner une commande...")
                .addOptions(commands)
        );

        await interaction.followUp({ components: [row] });
    }
}

export default command;