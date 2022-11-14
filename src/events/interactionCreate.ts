import { Events, Interaction } from "discord.js";
import { handleSlashCommand } from "../handlers";
import { ExtendedClient, IEvent } from "../bot";

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if (interaction.isCommand()) {
            if (interaction.channelId === process.env.BOT_COMMAND_CHANNEL_ID! || interaction.user.id === process.env.OWNER_ID!)
                await handleSlashCommand(client, interaction);
            else
                await interaction.reply({ content: "Mauvais channel abruti !" });
        }
    },
};

export default event;