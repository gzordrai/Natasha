import { ChatInputCommandInteraction, Collection, EmbedBuilder, GuildEmoji, GuildMember, SlashCommandBuilder } from "discord.js";
import { User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Le leaderboard du serveur"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction): Promise<void> {
        const user: User = await new User(interaction.user.id).sync();
        const users: Array<User> = await user.getAll();
        const embed: EmbedBuilder = new EmbedBuilder()
            .setTitle("Leaderboard")
            .setThumbnail(client.user!.displayAvatarURL());
        const petalEmoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        let usersId: Array<string> = new Array<string>();
        let description: string = "";

        // Fetch all members together rather than one by one and spam the API
        for (const u of users)
            usersId.push(u.getId());

        const guildMembers: Collection<string, GuildMember> = await interaction.guild!.members.fetch({ user: usersId });

        for (let i = 0; i < users.length; i++) {
            description += `${guildMembers.get(users[i].getId())!.user.username}`;

            if (i === 0)
                description += " aka Elon Musk:"
            else if (i === 1)
                description += " la contrefaçon d'Elon Musk:";
            else if (i === users.length - 2)
                description += " le clochard:";
            else if (i === users.length - 1)
                description += " le clochard puant:";
            description += ` ${users[i].balance.get()} ${petalEmoji}\n`;
        }

        embed.setDescription(description);
        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;