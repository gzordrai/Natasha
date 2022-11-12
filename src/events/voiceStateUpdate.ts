import { ChannelType, Events, VoiceChannel, VoiceState } from "discord.js";
import { randomChannelName } from "../util/randomChannelName";
import { ExtendedClient, IEvent } from "../bot";

const event: IEvent = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(client: ExtendedClient, oldState: VoiceState, newState: VoiceState): Promise<void> {
        // Voice connection
        if (newState.channelId === process.env.CHANNEL_CREATOR_ID) {
            await newState.guild.channels.create({
                name: await randomChannelName(),
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