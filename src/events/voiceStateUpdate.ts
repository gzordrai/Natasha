import { ChannelType, Events, VoiceChannel, VoiceState } from "discord.js";
import { randomChannelName } from "../util/randomChannelName";
import { ExtendedClient, Event } from "../bot";

const event: Event = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(client: ExtendedClient, oldState: VoiceState, newState: VoiceState): Promise<void> {
        if (newState.channelId === process.env.CHANNEL_CREATOR_ID) { // Voice connection
            const name: string = await randomChannelName();

            await newState.guild.channels.create({
                name: name,
                type: ChannelType.GuildVoice
            }).then(async (channel: VoiceChannel) => {
                channel.setParent(newState.channel!.parentId);
                newState.setChannel(channel.id);
            }).catch(console.error);
        } else if (oldState.channelId !== null) { // Voice disconnection
            if (oldState.channel!.members.size === 0 && oldState.channelId !== process.env.CHANNEL_CREATOR_ID) {
                setTimeout(async () => {
                    await oldState.channel!.delete();
                }, 2000);
            }
        }
    },
};

export default event;