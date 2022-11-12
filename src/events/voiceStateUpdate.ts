import { ChannelType, Events, VoiceChannel, VoiceState } from "discord.js";
import { ExtendedClient, IEvent } from "../bot";

const channelNames: Array<string> = [
    "La cave de Simon",
    "La chambre de Natasha",
    "La kouizine de Gilles",
    "La grenier de Thibaut",
    "Le marais de Maxime",
    "Le trône de Maxime"
];
const event: IEvent = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(client: ExtendedClient, oldState: VoiceState, newState: VoiceState): Promise<void> {
        // Voice connection
        if (newState.channelId === process.env.CHANNEL_CREATOR_ID) {
            await newState.guild.channels.create({
                name: channelNames[Math.floor(Math.random() * (channelNames.length - 0 + 1)) + 0],
                type: ChannelType.GuildVoice
            }).then(async (channel: VoiceChannel) => {
                channel.setParent(newState.channel!.parentId);
                newState.setChannel(channel.id);
            }).catch(console.error);
        } else if (oldState.channelId !== null) {// Voice disconnection
            if (oldState.channel!.members.size === 0 && oldState.channelId !== process.env.CHANNEL_CREATOR_ID)
                await oldState.channel!.delete();
        }
    },
};

export default event;