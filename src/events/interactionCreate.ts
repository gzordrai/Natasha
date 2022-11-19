import { Collection, Events, Interaction } from "discord.js";
import { handleSelectMenu, handleSlashCommand } from "../handlers";
import { ExtendedClient, Event } from "../bot";
import { Database, User } from "../database";

const event: Event = {
    name: Events.InteractionCreate,
    once: false,
    async execute(client: ExtendedClient, interaction: Interaction): Promise<void> {
        const channelId: string = interaction.channelId!;
        const userId: string = interaction.user.id;
        let user: User;

        if(!interaction.channel?.isTextBased()) return;

        if(!(await Database.has(userId)))
            user = await Database.addUser(userId);
        else
            user = await Database.getUser(userId)

        if (interaction.isChatInputCommand()) {
            if (channelId === process.env.BOT_COMMAND_CHANNEL_ID! || userId === process.env.OWNER_ID!)
                await handleSlashCommand(client, interaction, user);
            else
                await interaction.reply({ content: `Mauvais channel abruti !` });
        } else if (interaction.isSelectMenu())
            await handleSelectMenu(client, interaction);
    },
};

export default event;