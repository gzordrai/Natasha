import { ChatInputCommandInteraction, Collection, EmbedBuilder, GuildEmoji, GuildMember, SlashCommandBuilder } from "discord.js";
import { Database, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("leaderboard")
        .setDescription("Le leaderboard du serveur"),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const users: Array<User> = await Database.getAllUsers();
        const embed: EmbedBuilder = new EmbedBuilder();
        const petalEmoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env.PETAL_EMOJI_ID!)!;
        let usersId: Array<string> = new Array<string>();
        let description: string = "";

        for (const user of users)
            usersId.push(user.getId());

        const guildMembers: Collection<string, GuildMember> = await interaction.guild!.members.fetch({ user: usersId });

        for (let i = 0; i < users.length; i++)
            description += `${i + 1} - ${guildMembers.get(users[i].getId())!.user.username}: ${users[i].balance.get()} ${petalEmoji}\n`;

        embed.setTitle("Leaderboard");
        embed.setDescription(description);
        embed.setColor("Blue");

        await interaction.followUp({ embeds: [embed] });
    }
}

export default command;