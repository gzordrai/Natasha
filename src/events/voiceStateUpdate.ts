import { ChannelType, Events, GuildBasedChannel, VoiceChannel, VoiceState } from "discord.js";
import { channelNames, randomChannelName } from "../util/randomChannelName";
import { ExtendedClient, Event } from "../bot";
import { User } from "../database";

const event: Event = {
    name: Events.VoiceStateUpdate,
    once: false,
    async execute(client: ExtendedClient, oldState: VoiceState, newState: VoiceState): Promise<void> {
        // Voice connection
        if (newState.channelId === process.env.CHANNEL_CREATOR_ID) {
            const user: User = await new User(newState.member?.id!).sync();
            const name: string = await randomChannelName();

            await newState.guild.channels.create({
                name: name,
                type: ChannelType.GuildVoice
            }).then(async (channel: VoiceChannel) => {
                channel.setParent(newState.channel!.parentId);
                newState.setChannel(channel.id);

                if (channelNames.legendary.includes(name)) {
                    const guildChannel: GuildBasedChannel =  newState.guild.channels.cache.get(process.env.BOT_COMMAND_CHANNEL_ID!)!;

                    if(guildChannel.isTextBased()) {
                        guildChannel.send({ content: `${newState.member?.user} a eu un channel légendaire ! Il gagne donc 50 ${newState.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!}` });
                        user.balance.add(50);
                        await user.save();
                    }
                }
            }).catch(console.error);
        } else if (oldState.channelId !== null) {// Voice disconnection
            if (oldState.channel!.members.size === 0 && oldState.channelId !== process.env.CHANNEL_CREATOR_ID)
                await oldState.channel!.delete();
        }
    },
};

export default event;