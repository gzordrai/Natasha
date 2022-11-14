import { Events, Interaction } from "discord.js";
import { handleSelectMenu, handleSlashCommand } from "../handlers";
import { ExtendedClient, IEvent } from "../bot";

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            if (interaction.channelId === process.env.BOT_COMMAND_CHANNEL_ID! || interaction.user.id === process.env.OWNER_ID!)
                await handleSlashCommand(client, interaction);
            else
                await interaction.reply({ content: `Mauvais channel abruti ! (${await interaction.guild?.channels.fetch(process.env.BOT_COMMAND_CHANNEL_ID!)} 👀)` });
        } else if (interaction.isSelectMenu())
            await handleSelectMenu(client, interaction);
    },
};

export default event;