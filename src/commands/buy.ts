import { ChatInputCommandInteraction, EmbedBuilder, GuildEmoji, SlashCommandBuilder, SlashCommandStringOption } from "discord.js";
import { Collectable, Database, Tool, User } from "../database";
import { ExtendedClient, Command } from "../bot";

export const command: Command = {
    data: new SlashCommandBuilder()
        .setName("buy")
        .setDescription("Vous permet d'acheter des articles")
        // .addSubcommand(subCommand =>
        //     subCommand
        //         .setName("item")
        //         .setDescription("Vous permet d'acheter un item")
        //         .addStringOption((option: SlashCommandStringOption) =>
        //             option
        //                 .setName("article")
        //                 .setDescription("L'article que vous souhaitez acheter")
        //                 .setRequired(true)
        //                 .addChoices()
        //         )
        //         .addIntegerOption(option =>
        //             option
        //                 .setName("number")
        //                 .setDescription("Le nombre d'exemplaire que vous souhaitez acheter")
        //                 .setRequired(true)
        //                 .setMinValue(1)
        //         )
        // )
        .addSubcommand(subCommand =>
            subCommand
                .setName("tool")
                .setDescription("Vous permet d'acheter un outil")
                .addStringOption((option: SlashCommandStringOption) =>
                    option
                        .setName("article")
                        .setDescription("L'article que vous souhaitez acheter")
                        .setRequired(true)
                        .addChoices(
                            { name: "Hache", value: "Hache" },
                            { name: "Pioche", value: "Pioche" }
                        )
                )
                .addIntegerOption(option =>
                    option
                        .setName("number")
                        .setDescription("Le nombre d'exemplaire que vous souhaitez acheter")
                        .setRequired(true)
                        .setMinValue(1)
                )
        ),
    async execute(client: ExtendedClient, interaction: ChatInputCommandInteraction, user: User): Promise<void> {
        const subCommand: string = interaction.options.getSubcommand(true);
        const choice: string = interaction.options.getString("article", true);
        const copies: number = interaction.options.getInteger("number", true);
        const embed: EmbedBuilder = new EmbedBuilder();
        const emoji: GuildEmoji = interaction.guild?.emojis.cache.get(process.env[`${choice.toUpperCase()}_EMOJI_ID`]!)!;
        let item: Collectable | Tool;

        if(subCommand === "item") {
            item = new Collectable("", 0);
            embed.setTitle("work in progress... 👀");
            embed.setColor("Blue");
        } else
            item = (await Database.getAllTools()).filter((t: Tool) => t.getName() === choice)[0];

        if (user.balance.has(item.getPrice() * copies)) {
            user.balance.add(-(item.getPrice() * copies));
            item.setCopies(copies);

            if (item instanceof Collectable)
                user.inventory.addCollectable(item);
            else if (item instanceof Tool)
                user.inventory.addTool(item);

            await Database.save(user);

            embed.setTitle(`Vous avez acheté x${copies} ${emoji} !`);
            embed.setColor("Green");
        } else {
            embed.setTitle("Vous n'avez pas assez d'argent !");
            embed.setColor("Red");
        }

        interaction.followUp({ embeds: [embed] });
    }
}

export default command;