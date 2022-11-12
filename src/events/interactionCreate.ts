import { Events, Interaction } from "discord.js";
import { handleSlashCommand } from "../handlers";
import { ExtendedClient, IEvent } from "../bot";

const event: IEvent = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        if (interaction.isCommand())
            await handleSlashCommand(client, interaction);
    },
};

export default event;