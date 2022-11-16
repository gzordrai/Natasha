import { ChatInputCommandInteraction, EmbedBuilder } from "discord.js";
import { Cooldown, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const handleSlashCommand = async (client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> => {
    const commandName: string = interaction.commandName;
    const command: Command = client.commands.get(commandName)!;

    try {
        await interaction.deferReply();

        if (command.cooldown) {
            const user: User = await new User(interaction.user.id).sync();
            const cooldown: Cooldown = user.cooldowns.get(commandName)!;

            if (!cooldown.isFinished(command.cooldown)) {
                const embed: EmbedBuilder = new EmbedBuilder();

                embed.setTitle(`Merci de patienter encore ${cooldown.getTimeLeft(command.cooldown)}`);
                embed.setColor("Red");

                await interaction.followUp({ embeds: [embed] });
            } else {
                cooldown.reset();
                await command.execute(client, interaction);
            }
        } else
            await command.execute(client, interaction);
    } catch (error: unknown) {
        console.log(error);
        await interaction.reply({ content: "Une erreur inattendue s'est produite lors de l'éxecution de la commande !", ephemeral: true });
    }
}